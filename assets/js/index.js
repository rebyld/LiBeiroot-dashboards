$(function () {

    //region GLOBALS

    // let _mainDomain = 'https://libeiroot-dashboards.herokuapp.com';
    let _mainDomain = 'http://localhost/dashboard';
    let _apiEP = 'https://libeiroot-dev.herokuapp.com/api/v1';
    let _opsEP = 'https://libeiroot-dev.herokuapp.com/api/v1/ops';

    let _token = '';
    let _username = '';
    let _email = '';
    let _userId = '';

    // questions
    var _questionResult;
    var allQuestions = [];
    var selectedQuestions = [];

    // forms
    var allForms = [];
    var allQuestionsItems = $('#sortable1');
    var selectedQuestionsItems = $('#sortable2');
    var submittedFormJson = {
        name: "",
        questions: [],
        message: '',
        variables: [],
        pointsMapping: {pointA: {}, pointB: {}, pointC: {},}
    };
    var pointA = {};
    var pointB = {};
    var pointC = {};

    // services
    var allServices = [];
    var submittedServiceJson = {
        name: '',
        nameAr: '',
        description: '',
        descriptionAr: '',
        type: '',
        price: 0,
        form: '',
        image: '',
        categoryId: ''
    };

    // cards
    var allCards = [];
    var submittedCardJson = {
        title: '',
        titleAr: '',
        headerText: '',
        headerTextAr: '',
        description: '',
        descriptionAr: '',
        type: '',
        image: '',
        service: '',
        expiresAt: ''
    };

    // category
    var allCategories = [];
    var submittedCategoryJson = {
        title: '',
        titleAr: '',
        type: '',
        image: '',
        service: ''
    };

    // coupons
    var allCoupons = [];
    var submittedCouponJson = {
        title: '',
        code: '',
        type: '',
        services: [],
        expiresAt: '',
        amount: ''
    };

    // drivers
    var allProviders = [];
    var submittedServiceProviderJson = {
        firstName: '',
        lastName: '',
        syrianNumber: '',
        lebaneseNumber: '',
        whatsApp: '',
        homeNumber: '',
        address: '',
        memberShipId: '',
        memberShip: '',
        birthday: '',
        driverSince: '',
        type: '',
    };

    var submittedCarJson = {
        brand: '',
        model: '',
        seats: 0,
        bags: 0,
        type: '',
        licensePicture: ''
    };

    // orders
    var allOrders = [];

    // Enums
    var AlertColors = {
        _DANGER: 'bg-red',
        _WARNING: 'bg-orange',
        _SUCCESS: 'bg-green',
        _INFO: 'bg-blue'
    };

    var AlertStrings = {
        // Errors
        _SIGN_IN_AUTH_ERROR: 'Invalid Username or Password!',
        _NETWORK_ERROR: 'Something wrong with your internet connection, please check!',

        // Warnings
        _UNPROCESSABLE_ENTITY: 'Some of the values are incorrect, please check and retry.',
        _CREATE_SERVICE_ENTER_FORM: 'Please select a form!',
        _CREATE_SERVICE_ENTER_CATEGORY: 'Please select a category!',

        // Success
        _CREATE_SUCCESS: 'Created Successfully!',

        // Info
        _INFO_UPLOADING_IMAGE: 'Uploading image...',
        _INFO_SUBMITTING: 'Uploading image...'
    };

    init();

    //endregion

    //region FUNCTIONS

    //region GLOBALS

    function init() {
        initSession();

        let body = $('body');

        if (body.hasClass("orders-page")) {

            $.when(getCategories()).then(function () {
                var _parent = $('#dl-filter-category');

                $(allCategories).each(function (i, v) {
                    _parent.append('<option value="' + v._id + '">' + v.title + '</option>');
                });
            });

            $.when(getServices()).then(function () {
                var _parent = $('#dl-filter-service');

                $(allServices).each(function (i, v) {
                    _parent.append('<option value="' + v._id + '">' + v.name + '</option>');
                });
            });

            updateOrdersTableBy('');
        }

        if (body.hasClass("forms")) {
            initFormCreation();
        }

        if (body.hasClass('get-forms')) {
            loadFormsIntoUI();
        }

        if (body.hasClass("services")) {
            getForms();
            getCategories();
        }

        if (body.hasClass('get-services')) {
            loadServicesIntoUI();
        }

        if (body.hasClass('get-categories')) {
            loadCategoriesIntoUI();
        }

        if (body.hasClass('get-providers')) {
            loadProvidersIntoUI();
        }

        if (body.hasClass('get-coupons')) {
            loadCouponsIntoUI();
        }

        if (body.hasClass("cards") || body.hasClass("coupons")) {
            loadCardsIntoUI();

            $.when(getServices()).then(function () {
                let _serviceSelect = $('#dl-service');

                $(allServices).each(function (i, v) {
                    _serviceSelect.append('<option value="' + v._id + '">' + v.name + '</option>');
                });
            });
        }

        if (body.hasClass('questions')) {
            loadQuestionsIntoUI();
        }

        $('#dl-ops-username').html(_username);
        $('#dl-ops-email').html(_email);
    }

    //endregion

    //region QUESTIONS

    function getQuestions() {
        allQuestions = [];

        return $.when(
            $.ajax({
                type: "GET",
                contentType: 'application/json',
                url: _opsEP + '/questions?limit=100',
                beforeSend: function (xhr) {
                    setupHeaders(xhr);
                },
                success: function (response) {
                    $(response.data).each(function (index, value) {
                        allQuestions.push(value);

                    });
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    errorBehaviour(response);
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                }
            })
        );
    }

    function getQuestionTypeSchema(type) {
        var schema;

        switch (type) {
            case 'select':
                schema = {
                    "name": {
                        "type": "string",
                        "required": true,
                        "title": "Question name (must be unique)"
                    },
                    "text": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ENGLISH"
                    },
                    "textAr": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ARABIC"
                    },
                    "type": {
                        "type": "string",
                        "default": type
                    },
                    "answers": {
                        "title": "All Answers",
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "text": {
                                    "type": "string",
                                    "required": true,
                                    "title": "Answer in ENGLISH"
                                },
                                "textAr": {
                                    "type": "string",
                                    "required": true,
                                    "title": "Answer in ARABIC"
                                },
                                "icon_upload": {
                                    "type": "file",
                                    "title": "Select icon"
                                },
                                "icon": {
                                    "type": "hidden",
                                    "title": "Select icon"
                                }
                            }
                        }
                    }
                };
                return schema;

            case 'multi_select':
                schema = {

                    "name": {
                        "type": "string",
                        "required": true,
                        "title": "Question name (must be unique)"
                    },
                    "text": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ENGLISH"
                    },
                    "textAr": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ARABIC"
                    },
                    "type": {
                        "type": "string",
                        "default": type
                    },
                    "answers": {
                        "title": "All Answers",
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "text": {
                                    "type": "string",
                                    "required": true,
                                    "title": "Answer in ENGLISH"
                                },
                                "textAr": {
                                    "type": "string",
                                    "required": true,
                                    "title": "Answer in ARABIC"
                                }
                            }
                        }
                    }
                };
                return schema;

            case 'checkbox':
                schema = {
                    "name": {
                        "type": "string",
                        "required": true,
                        "title": "Question name (must be unique)"
                    },
                    "text": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ENGLISH"
                    },
                    "textAr": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ARABIC"
                    },
                    "type": {
                        "type": "string",
                        "default": type
                    }
                };
                return schema;

            case 'text':
                schema = {
                    "placeholder": {
                        "type": "string",
                        "title": "Placeholder Hint text"
                    },
                    "name": {
                        "type": "string",
                        "required": true,
                        "title": "Question name (must be unique)"
                    },
                    "text": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ENGLISH"
                    },
                    "textAr": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ARABIC"
                    },
                    "type": {
                        "type": "string",
                        "default": type
                    }
                };
                return schema;

            case 'label':
                schema = {
                    "name": {
                        "type": "string",
                        "required": true,
                        "title": "Question name (must be unique)"
                    },
                    "text": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ENGLISH"
                    },
                    "textAr": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ARABIC"
                    },
                    "type": {
                        "type": "string",
                        "default": type
                    }
                };
                return schema;

            case 'text_area':
                schema = {
                    "placeholder": {
                        "type": "string",
                        "title": "Placeholder Hint text"
                    },
                    "name": {
                        "type": "string",
                        "required": true,
                        "title": "Question name (must be unique)"
                    },
                    "text": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ENGLISH"
                    },
                    "textAr": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ARABIC"
                    },
                    "type": {
                        "type": "string",
                        "default": type
                    }
                };
                return schema;

            case 'date':
                schema = {
                    "name": {
                        "type": "string",
                        "required": true,
                        "title": "Question name (must be unique)"
                    },
                    "text": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ENGLISH"
                    },
                    "textAr": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ARABIC"
                    },
                    "type": {
                        "type": "string",
                        "default": type
                    }
                };
                return schema;

            case 'time':
                schema = {
                    "name": {
                        "type": "string",
                        "required": true,
                        "title": "Question name (must be unique)"
                    },
                    "text": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ENGLISH"
                    },
                    "textAr": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ARABIC"
                    },
                    "type": {
                        "type": "string",
                        "default": type
                    }
                };
                return schema;

            case 'phone_number':
                schema = {
                    "name": {
                        "type": "string",
                        "required": true,
                        "title": "Question name (must be unique)"
                    },
                    "text": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ENGLISH"
                    },
                    "textAr": {
                        "type": "string",
                        "required": true,
                        "title": "Question text in ARABIC"
                    },
                    "type": {
                        "type": "string",
                        "default": type
                    }
                };
                return schema;
        }
    }

    function getQuestionKeys(type, isDisabled, hasSubmit) {
        var keys;

        switch (type) {
            case 'select':
                keys = [
                    {
                        "key": "name",
                        "disabled": isDisabled
                    },
                    {
                        "key": "text",
                        "disabled": isDisabled
                    },
                    {
                        "key": "textAr",
                        "disabled": isDisabled
                    },
                    {
                        "key": "answers",
                        "disabled": isDisabled
                    },
                    {
                        "key": "type",
                        "type": "hidden"
                    },
                    hasSubmit
                        ? {
                            "type": "submit",
                            "title": "Submit",
                            "htmlClass": "btn-lg"
                        }
                        : {}
                ];
                return keys;

            case 'multi_select':
                keys = [
                    {
                        "key": "name",
                        "disabled": isDisabled
                    },
                    {
                        "key": "text",
                        "disabled": isDisabled
                    },
                    {
                        "key": "textAr",
                        "disabled": isDisabled
                    },
                    {
                        "key": "answers",
                        "disabled": isDisabled
                    },
                    {
                        "key": "type",
                        "type": "hidden"
                    },
                    hasSubmit
                        ? {
                            "type": "submit",
                            "title": "Submit",
                            "htmlClass": "btn-lg"
                        }
                        : {}
                ];
                return keys;

            case 'checkbox':
                keys = [
                    {
                        "key": "name",
                        "disabled": isDisabled
                    },
                    {
                        "key": "text",
                        "disabled": isDisabled
                    },
                    {
                        "key": "textAr",
                        "disabled": isDisabled
                    },
                    {
                        "key": "type",
                        "type": "hidden"
                    },
                    hasSubmit
                        ? {
                            "type": "submit",
                            "title": "Submit",
                            "htmlClass": "btn-lg"
                        }
                        : {}
                ];
                return keys;

            case 'text':
                keys = [
                    {
                        "key": "placeholder",
                        "disabled": isDisabled
                    },
                    {
                        "key": "name",
                        "disabled": isDisabled
                    },
                    {
                        "key": "text",
                        "disabled": isDisabled
                    },
                    {
                        "key": "textAr",
                        "disabled": isDisabled
                    },
                    {
                        "key": "type",
                        "type": "hidden"
                    },
                    hasSubmit
                        ? {
                            "type": "submit",
                            "title": "Submit",
                            "htmlClass": "btn-lg"
                        }
                        : {}
                ];
                return keys;

            case 'text_area':
                keys = [
                    {
                        "key": "placeholder",
                        "disabled": isDisabled
                    },
                    {
                        "key": "name",
                        "disabled": isDisabled
                    },
                    {
                        "key": "text",
                        "disabled": isDisabled
                    },
                    {
                        "key": "textAr",
                        "disabled": isDisabled
                    },
                    {
                        "key": "type",
                        "type": "hidden"
                    },
                    hasSubmit
                        ? {
                            "type": "submit",
                            "title": "Submit",
                            "htmlClass": "btn-lg"
                        }
                        : {}
                ];
                return keys;

            case 'label':
                keys = [
                    {
                        "key": "name",
                        "disabled": isDisabled
                    },
                    {
                        "key": "text",
                        "disabled": isDisabled
                    },
                    {
                        "key": "textAr",
                        "disabled": isDisabled
                    },
                    {
                        "key": "type",
                        "type": "hidden"
                    },
                    hasSubmit
                        ? {
                            "type": "submit",
                            "title": "Submit",
                            "htmlClass": "btn-lg"
                        }
                        : {}
                ];
                return keys;

            case 'date':
                keys = [
                    {
                        "key": "name",
                        "disabled": isDisabled
                    },
                    {
                        "key": "text",
                        "disabled": isDisabled
                    },
                    {
                        "key": "textAr",
                        "disabled": isDisabled
                    },
                    {
                        "key": "type",
                        "type": "hidden"
                    },
                    hasSubmit
                        ? {
                            "type": "submit",
                            "title": "Submit",
                            "htmlClass": "btn-lg"
                        }
                        : {}
                ];
                return keys;

            case 'time':
                keys = [
                    {
                        "key": "name",
                        "disabled": isDisabled
                    },
                    {
                        "key": "text",
                        "disabled": isDisabled
                    },
                    {
                        "key": "textAr",
                        "disabled": isDisabled
                    },
                    {
                        "key": "type",
                        "type": "hidden"
                    },
                    hasSubmit
                        ? {
                            "type": "submit",
                            "title": "Submit",
                            "htmlClass": "btn-lg"
                        }
                        : {}
                ];
                return keys;

            case 'phone_number':
                keys = [
                    {
                        "key": "name",
                        "disabled": isDisabled
                    },
                    {
                        "key": "text",
                        "disabled": isDisabled
                    },
                    {
                        "key": "textAr",
                        "disabled": isDisabled
                    },
                    {
                        "key": "type",
                        "type": "hidden"
                    },
                    hasSubmit
                        ? {
                            "type": "submit",
                            "title": "Submit",
                            "htmlClass": "btn-lg"
                        }
                        : {}
                ];
                return keys;
        }
    }

    function getQuestionValues(type) {
        var values;

        switch (type) {
            case 'select':
                values = {
                    "name": _questionResult.name,
                    "text": _questionResult.text,
                    "textAr": _questionResult.textAr,
                    "answers": _questionResult.answers,
                    "type": type
                };
                return values;

            case 'multi_select':
                values = {
                    "name": _questionResult.name,
                    "text": _questionResult.text,
                    "textAr": _questionResult.textAr,
                    "answers": _questionResult.answers,
                    "type": type
                };
                return values;

            case 'checkbox':
                values = {
                    "name": _questionResult.name,
                    "text": _questionResult.text,
                    "textAr": _questionResult.textAr,
                    "type": type
                };
                return values;

            case 'text':
                values = {
                    "name": _questionResult.name,
                    "text": _questionResult.text,
                    "textAr": _questionResult.textAr,
                    "type": type
                };
                return values;

            case 'label':
                values = {
                    "name": _questionResult.name,
                    "text": _questionResult.text,
                    "textAr": _questionResult.textAr,
                    "type": type
                };
                return values;

            case 'date':
                values = {
                    "name": _questionResult.name,
                    "text": _questionResult.text,
                    "textAr": _questionResult.textAr,
                    "type": type
                };
                return values;

            case 'time':
                values = {
                    "name": _questionResult.name,
                    "text": _questionResult.text,
                    "textAr": _questionResult.textAr,
                    "type": type
                };
                return values;

            case 'phone_number':
                values = {
                    "name": _questionResult.name,
                    "text": _questionResult.text,
                    "textAr": _questionResult.textAr,
                    "type": type
                };
                return values;

            case 'text_area':
                values = {
                    "name": _questionResult.name,
                    "text": _questionResult.text,
                    "textAr": _questionResult.textAr,
                    "type": type
                };
                return values;
        }
    }

    function getQuestionById(data, id) {
        var _res = '';

        $(data).each(function (i, v) {
            if (v.question._id === id) {
                _res = v;
                return false;
            }
        });

        return _res;
    }



    //endregion

    //region FORMS

    function getForms() {
        allForms = [];

        return $.when(
            $.ajax({
                type: "GET",
                contentType: 'application/json',
                url: _opsEP + "/forms",
                beforeSend: function (xhr) {
                    setupHeaders(xhr);
                },
                success: function (response) {
                    $(response).each(function (index, value) {
                        allForms.push(value);
                    });
                    $('.page-loader-wrapper.process').fadeOut();

                    $(allForms).each(function (i, v) {
                        $('#dl-forms-dropdown').append('<option value="' + v._id + '">' + v.name + '</option>');
                    });
                },
                error: function (response) {
                    errorBehaviour(response);
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                }
            })
        );
    }

    function initFormCreation() {
        $.when(getQuestions()).then(function () {
            var _parent = $('.dl-preview-questions-container');
            _parent.empty();

            // converting questions to UI elements so OPS can drag/drop questions
            $(allQuestions).each(function (i, v) {

                //todo: try to convert to template, there's issue with i
                // allQuestionsItems.append(questionLiElementTemplate(v, {vars:[{'index' : i}] }));

                allQuestionsItems.append(
                    $('<li/>')
                        .addClass('ui-state-default clearfix card filtered')
                        .attr('data-index', i)
                        .attr('data-filter-name', v.text)
                        .attr('data-question-id', v._id)
                        .appendTo(allQuestionsItems).append(
                        $('<div />')
                            .addClass('clearfix')
                            .appendTo(allQuestionsItems).append(
                            '<p class="pull-left f-s-16">' + v.text + '</p>')
                            .appendTo(allQuestionsItems).append(
                            '<p class="dl-small-p pull-right">' + v.answers.length + ' Answers</p>'))
                        .appendTo(allQuestionsItems).append(
                        '<p class="dl-small-p">Question name: ' + v.name + '</p>')
                );
            });

            var _pointsContainer = $('#dl-points-container');

            var points = [
                {
                    'name': 'Point A',
                    'point': 'pointA'
                },
                {
                    'name': 'Point B',
                    'point': 'pointB'
                },
                {
                    'name': 'Point C',
                    'point': 'pointC'
                }
            ];

            $(points).each(function (i, v) {
                _pointsContainer.append(pointTemplate(v));
            });

        });

        // init sorting plugin
        $("#sortable1, #sortable2").sortable({
            connectWith: ".connectedSortable"
        }).disableSelection();
    }

    function getFormById(id) {
        return $.when(
            $.ajax({
                type: "GET",
                contentType: 'application/json',
                url: _apiEP + "/forms/" + id,
                beforeSend: function (xhr) {
                    setupHeaders(xhr);
                },
                success: function () {
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    errorBehaviour(response);
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                }
            })
        );
    }

    // update selected questions in main selected questions array
    function updateSelectedAnswer() {

        // since we're updating, we need to empty the array first!
        selectedQuestions = [];

        // find all selected <li> elements
        var _questionsElements = $(selectedQuestionsItems).find('li');

        $(_questionsElements).each(function (i, v) {
            var _tempIndex = $(v).attr('data-index');
            selectedQuestions.push(allQuestions[_tempIndex]);
        });

        updateSelectedQuestionsForPoints();
    }

    // check if submitted form already has a question
    function isJsonFormHasQuestion(questionId) {
        var _result = false;

        $(submittedFormJson.questions).each(function (i, v) {
            if (v.question === questionId) {
                _result = true;
                return false;
            }
        });

        return _result;
    }

    // if a question has rules, it will be appended in adding rules function,
    // so it will be added without position, this will fix that!
    function appendPositionToQuestionInForm(position, questionId) {

        // iterate on each question to find the specific question via id
        $(submittedFormJson.questions).each(function (i, v) {
            if (v.question === questionId) {
                v.position = position;
            }
        });
    }

    function updateSelectedQuestionsForPoints() {
        var _selectedQuestionsContainer = $('.dl-selected-questions');

        _selectedQuestionsContainer.empty();
        _selectedQuestionsContainer.append('<option> --- </option>');

        $(selectedQuestions).each(function (i, v) {
            _selectedQuestionsContainer.append('<option value="' + v._id + '">' + v.text + '</option>');
        });
    }


    //endregion

    //region SERVICES

    function getServices() {
        allServices = [];

        return $.when(
            $.ajax({
                type: "GET",
                contentType: 'application/json',
                url: _opsEP + "/services",
                beforeSend: function (xhr) {
                    setupHeaders(xhr);
                },
                success: function (response) {
                    $(response).each(function (index, value) {
                        allServices.push(value);
                    });
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    errorBehaviour(response);
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                }
            })
        );
    }

    //endregion

    //region CARDS

    function getCards() {
        allCards = [];

        return $.when(
            $.ajax({
                type: "GET",
                contentType: 'application/json',
                url: _opsEP + "/cards",
                beforeSend: function (xhr) {
                    setupHeaders(xhr);
                },
                success: function (response) {
                    $(response.cards).each(function (index, value) {
                        allCards.push(value);
                    });
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    errorBehaviour(response);
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                }
            })
        );
    }

    //endregion

    //region CATEGORIES

    function getCategories() {
        allCategories = [];

        return $.when(
            $.ajax({
                type: "GET",
                contentType: 'application/json',
                url: _opsEP + "/categories",
                beforeSend: function (xhr) {
                    setupHeaders(xhr);
                },
                success: function (response) {
                    $(response.categories).each(function (index, value) {
                        allCategories.push(value);
                    });
                    $('.page-loader-wrapper.process').fadeOut();

                    $(allCategories).each(function (i, v) {
                        $('#dl-categories-dropdown').append('<option value="' + v._id + '">' + v.title + '</option>');
                    });
                },
                error: function (response) {
                    errorBehaviour(response);
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                }
            })
        );
    }

    //endregion

    //region COUPONS

    function getCoupons() {
        allCoupons = [];

        return $.when(
            $.ajax({
                type: "GET",
                contentType: 'application/json',
                url: _opsEP + "/coupons",
                beforeSend: function (xhr) {
                    setupHeaders(xhr);
                },
                success: function (response) {
                    $(response).each(function (index, value) {
                        allCoupons.push(value);
                    });
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    errorBehaviour(response);
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                }
            })
        );
    }

    function appendServicesToCoupon(item) {
        var _parent = $("#" + item._id);

        $(item.services).each(function (i, v) {
            $(_parent).append($('<p />').html(v.name));
        });
        $(_parent).append($('<hr />'));
    }


    //endregion

    //region SERVICE PROVIDERS

    function getProviders() {
        allProviders = [];

        return $.when(
            $.ajax({
                type: "GET",
                contentType: 'application/json',
                url: _opsEP + "/drivers",
                beforeSend: function (xhr) {
                    setupHeaders(xhr);
                },
                success: function (response) {
                    $(response).each(function (index, value) {
                        allProviders.push(value);
                    });
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    errorBehaviour(response);
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                }
            })
        );
    }

    //endregion

    //region ORDERS

    function getOrders(filters) {
        allOrders = [];
        var data = isNotDead(filters) ? filters : '';

        return $.when(
            $.ajax({
                type: "GET",
                contentType: 'application/json',
                url: _opsEP + "/orders?" + data,
                beforeSend: function (xhr) {
                    setupHeaders(xhr);
                },
                success: function (response) {
                    $(response).each(function (index, value) {
                        allOrders.push(value);
                    });
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    errorBehaviour(response);
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                }
            })
        );
    }

    function updateOrdersTableBy(filters) {
        $.when(getOrders(filters)).then(function () {
            var _parent = $('.dl-orders-table tbody');
            _parent.empty();

            $('#dl-orders-number').text('Total Orders (' + allOrders.length + ')');

            $(allOrders).each(function (i, v) {
                if (!isNotDead(v.paymentStatus)) {
                    v.paymentStatus = '- -';
                }
                if (!isNotDead(v.itemStatus)) {
                    v.itemStatus = '- -';
                }
                $(_parent).append(orderRowTemplate(v));
            });
        });
    }

    function getSingleOrder(id) {
        return $.when(
            $.ajax({
                type: "GET",
                contentType: 'application/json',
                url: _opsEP + "/orders/" + id,
                beforeSend: function (xhr) {
                    setupHeaders(xhr)
                },
                success: function (response) {
                    $(response).each(function (index, value) {
                        allOrders.push(value);
                    });
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    errorBehaviour(response);
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                }
            })
        );
    }

    //endregion

    //region OTHERS

    // takes input element to get image from, returns url for storing in S3 database
    function uploadImage(element) {

        var formData = new FormData();
        formData.append('image', $(element)[0].files[0]);

        return $.when(
            $.ajax({
                type: "POST",
                contentType: false,
                processData: false,
                url: _apiEP + "/upload",
                data: formData,
                beforeSend: function (xhr) {
                    setupHeaders(xhr);
                    showNotification(AlertColors._INFO, AlertStrings._INFO_UPLOADING_IMAGE);
                },
                success: function () {
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    errorBehaviour(response);
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                }
            })
        );
    }

    function isNotDead(value) {
        return typeof value !== typeof undefined && value !== false;
    }

    function isNotEmpty(value) {
        return value.length > 0;
    }

    function filter(e) {
        var regex = new RegExp('\\b\\w*' + e.toLowerCase() + '\\w*\\b');
        $('.filtered-container .filtered').hide().filter(function () {
            return regex.test($(this).attr('data-filter-name').toLowerCase())
        }).show();
    }

    function setupHeaders(xhr) {
        xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
        $('.page-loader-wrapper.process').fadeIn();
    }

    function errorBehaviour(response) {
        $('.page-loader-wrapper.process').fadeOut();
        console.log(response);
    }

    //endregion

    //endregion

    //region EVENTS

    //region QUESTIONS

    $('.generate-question').on('click', function (e) {
        e.preventDefault();

        var _type = $(this).data("question-type");
        var _form = $("#dynamic-form");

        _form.empty();

        _form.jsonForm({
            "schema": getQuestionTypeSchema(_type),
            "form": getQuestionKeys(_type, false, true),
            onSubmit: function (errors, values) {
                console.log(values);
                $.ajax({
                    type: "POST",
                    contentType: 'application/json',
                    url: _opsEP + "/questions",
                    data: JSON.stringify(values),
                    beforeSend: function (xhr) {
                        setupHeaders(xhr);
                    },
                    success: function (response) {
                        $('.page-loader-wrapper.process').fadeOut();
                        _questionResult = response;
                        showNotification(AlertColors._SUCCESS, AlertStrings._CREATE_SUCCESS);
                        location.reload();
                    },
                    error: function (response) {
                        errorBehaviour(response);
                        showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                    }
                });
            }
        });
    });

    function loadQuestionsIntoUI() {
        $.when(getQuestions()).then(function () {
            var _parent = $('.dl-preview-questions-container');
            _parent.empty();

            _parent.append('' +
                ' <div class="col-md-12"><h4>('+allQuestions.length+') Questions</h4></div>');
            $(allQuestions).each(function (i, v) {
                _questionResult = v;
                var _type = v.type;

                _parent.append(
                    $('<div />')
                        .addClass('col-lg-4 col-md-4 col-sm-6 col-xs-12 filtered')
                        .attr('data-filter-name', v.text)
                        .appendTo(_parent).append(
                        $('<div />')
                            .addClass('card')
                            .appendTo(_parent).append(
                            $('<div/>').addClass('header clearfix')
                                .appendTo(_parent).append($('<h2>').html(v.type).addClass('pull-left dl-type-' + v.type + ' '))
                                .appendTo(_parent).append($('<i>')
                                .addClass('pull-right material-icons col-red dl-delete')
                                .attr('data-endpoint', '/questions/')
                                .attr('data-render', 'dl-get-questions')
                                .attr('data-id', v._id)
                                .html('delete')))
                            .appendTo(_parent).append(
                            $('<div />')
                                .addClass('body dl-preview-single-question-' + i)
                        )
                    )
                );

                $('.dl-preview-single-question-' + i).jsonForm({
                    "schema": getQuestionTypeSchema(_type),
                    "form": getQuestionKeys(_type, true, false),
                    "value": getQuestionValues(_type)
                });

            });
        });
    }

    $(document).on('keyup', '#dl-search', function () {
        var selectSize = $(this).val();
        filter(selectSize);
    });

    // uploading icons is happening on the fly!
    $(document).on('change', '#dynamic-form .input-file', function (e) {
        e.preventDefault();
        var _parent = $(this).closest("li");
        var iconFiled = $(_parent).find('input:hidden');

        $.when(uploadImage($(this))).then(function (res) {
            $(iconFiled).val(res.url);
        });

    });

    //endregion

    //region FORMS

    // whenever we drag/drop, we will update some info on questions <li>
    selectedQuestionsItems.sortable({
        update: function (e, ui) {

            var type = allQuestions[ui.item.attr('data-index')].type;

            // check if the question has answers && the button hasn't been added before
            if (checkButtonRule(type) && $(ui.item).find('button.dl-add-rule-btn').length <= 0) {
                ui.item.append('<button class="btn btn-warning pull-right dl-add-rule-btn" data-index="' + ui.item.attr('data-index') + '">Add Rules</button>');
            } else if ($(ui.item).find('button.dl-add-jump-btn').length <= 0 && !checkButtonRule(type)) {
                ui.item.append('<button class="btn btn-info pull-left dl-add-jump-btn" data-index="' + ui.item.attr('data-index') + '">Add Default jump</button>');
            }

            updateSelectedAnswer();

        }
    });

    function appendSelectedAnswersToPreviewSection() {
        updateSelectedAnswer();

        var _parent = $('.dl-selected-questions-container-preview');
        var _guests = $('.dl-selected-question-dropdown');

        _parent.empty();

        console.log(selectedQuestions);

        $(selectedQuestions).each(function (i, v) {
            _parent.append('<p>- ' + v.text + '</p>');
            _guests.append('<p>- ' + v.text + '</p>');
        });
    }

    function checkButtonRule(type) {
        return type === 'time' || type === 'checkbox' || type === 'select';
    }

    // render the question with related answers, along with append button to each answer
    $(document).on('click', '.dl-add-rule-btn', function (e) {
        e.preventDefault();

        var _question = allQuestions[$(this).attr('data-index')];

        $('.dl-question-text').html(_question.text);
        $('.dl-question-text-ar').html(_question.textAr);

        var _answerContainer = $('.dl-answers-container');

        var _modal = $('#rulesFormModal');
        _answerContainer.empty();

        appendSelectedAnswersToPreviewSection();

        // The question id that the rule is being appended to.
        _answerContainer.attr('current-question-id', _question._id);
        _answerContainer.attr('dl-rule-type', 'rules');

        // adding rules without answers!
        if (_question.type === 'time') {
            _answerContainer.append(
                $('<div />')
                    .addClass('dl-single-answer-container clearfix')
                    .attr('data-answer-id', 'no-answer-id-for-this-type')
                    .appendTo(_answerContainer).append(
                    '<p class="dl-answer-text">Add time rule</p>')
                    .appendTo(_answerContainer).append(
                    $('<div>')
                        .addClass('clearfix m-b-10')
                        .appendTo(_answerContainer).append(
                        '<button class="btn btn-info btn-sm dl-append-action-to-answer-btn pull-left m-r-10" data-action="between">Append "between rule"</button>')
                        .appendTo(_answerContainer).append(
                        '<div class="dl-answers-dropdown-container pull-left"></div>'))
            );
        } else {
            $(_question.answers).each(function (i, v) {
                _answerContainer.append(
                    $('<div />')
                        .addClass('dl-single-answer-container clearfix')
                        .attr('data-answer-id', v._id)
                        .appendTo(_answerContainer).append(
                        '<p class="dl-answer-text">' + v.text + '</p>')
                        .appendTo(_answerContainer).append(
                        $('<div>')
                            .addClass('clearfix m-b-10')
                            .appendTo(_answerContainer).append(
                            '<button class="btn btn-info btn-sm dl-append-action-to-answer-btn pull-left m-r-10" data-action="jump">Append "Jump" rule</button>')
                            .appendTo(_answerContainer).append(
                            '<div class="dl-answers-dropdown-container pull-left"></div>'))
                        .appendTo(_answerContainer).append(
                        $('<div>')
                            .addClass('clearfix m-b-10')
                            .appendTo(_answerContainer).append(
                            '<button class="btn btn-info btn-sm dl-append-action-to-answer-btn pull-left m-r-10" data-action="add">Append "Add rule"</button>')
                            .appendTo(_answerContainer).append(
                            '<div class="dl-answers-dropdown-container pull-left"></div>'))
                        .appendTo(_answerContainer).append(
                        $('<div>')
                            .addClass('clearfix m-b-10')
                            .appendTo(_answerContainer).append(
                            '<button class="btn btn-info btn-sm dl-append-action-to-answer-btn pull-left m-r-10" data-action="between">Append "between rule"</button>')
                            .appendTo(_answerContainer).append(
                            '<div class="dl-answers-dropdown-container pull-left"></div>'))
                );
            });
        }

        _modal.modal('show');
    });


    $(document).on('click', '.dl-add-jump-btn', function (e) {
        e.preventDefault();

        var _question = allQuestions[$(this).attr('data-index')];

        $('.dl-question-text').html(_question.text);

        var _answerContainer = $('.dl-answers-container');
        var _modal = $('#rulesFormModal');

        _answerContainer.empty();

        appendSelectedAnswersToPreviewSection();

        // The question id that the rule is being appended to.
        _answerContainer.attr('current-question-id', _question._id);
        _answerContainer.attr('dl-rule-type', 'jump');

        _answerContainer.append(
            $('<div />')
                .addClass('clearfix dl-single-answer-container')
                .attr('data-answer-id', _question._id)
                .appendTo(_answerContainer).append(
                '<button class="btn btn-info btn-sm dl-append-action-to-answer-btn pull-left m-r-10" data-action="jump">Add Jump</button>')
                .appendTo(_answerContainer).append(
                '<div class="dl-answers-dropdown-container"></div>')
        );

        _modal.modal('show');
    });

    // Showing a dropdown for each answer from selected questions only!
    $(document).on('click', '.dl-append-action-to-answer-btn', function (e) {
        e.preventDefault();

        var _parentContainer = $(this).parent().find('.dl-answers-dropdown-container');
        var _ruleAction = $(this).attr('data-action');
        _parentContainer.empty();

        switch (_ruleAction) {
            case 'jump': {
                _parentContainer.append(
                    $('<select />')
                        .addClass('dl-dropdown')
                        .appendTo(_parentContainer).append(
                        '<option>----</option>')
                );

                $(selectedQuestions).each(function (i, v) {
                    _parentContainer.find('.dl-dropdown').append('<option data-question-id="' + v._id + '">' + v.text + ' (' + v.name + ')</option>');
                });

                break;
            }
            case 'add': {
                _parentContainer.append(
                    $('<input />')
                        .attr('id', 'dl-add-price-input')
                        .attr('placeholder', 'Value')
                        .attr('data-target', 'price')
                );
                break;
            }
            case 'between': {
                _parentContainer.append($('<label class="m-r-5">From: <input id="dl-time-from" type="time" data-range="from" /></label>'));
                _parentContainer.append($('<label class="m-r-5">To: <input id="dl-time-to" type="time" data-range="to" /></label>'));
                _parentContainer.append($('<label class="m-r-5">Will go to:</label>'));
                _parentContainer.append(
                    $('<select />')
                        .addClass('dl-dropdown m-l-5')
                        .appendTo(_parentContainer).append(
                        '<option>----</option>')
                );

                $(selectedQuestions).each(function (i, v) {
                    _parentContainer.find('.dl-dropdown').append('<option data-question-id="' + v._id + '">' + v.text + ' (' + v.name + ')</option>');
                });

                break;
            }
            default:
                return
        }
    });

    // on each change, we update the selected question id on the parent element for later use.
    // We're calling it here 'target question', which relate to the question that the answer
    // has to jump to upon selecting on mobile app.
    $(document).on('change', '.dl-dropdown', function () {
        var _answerElement = $(this).closest('.dl-single-answer-container');
        $(_answerElement).attr('data-selected-target-id', $('option:selected', this).attr('data-question-id'));
    });

    $(document).on('change', '#dl-add-price-input', function () {
        var _answerElement = $(this).closest('.dl-single-answer-container');
        $(_answerElement).attr('data-price', $(this).val());
    });

    $(document).on('change', '#dl-time-from', function () {
        var _answerElement = $(this).closest('.dl-single-answer-container');
        $(_answerElement).attr('data-time-from', $(this).val());
    });

    $(document).on('change', '#dl-time-to', function () {
        var _answerElement = $(this).closest('.dl-single-answer-container');
        $(_answerElement).attr('data-time-to', $(this).val());
    });

    // save rule of question, main insertion to final form will be here
    $(document).on('click', '.dl-save-rules-btn', function (e) {
        e.preventDefault();

        var _type = '';

        // Parent elements that contains all answers
        var _parent = $('.dl-answers-container');

        var _ruleType = $(_parent).attr('dl-rule-type');

        var _tempQuestionObject;
        var _answerName = '';

        if (_ruleType === 'jump') { // default jump

            // find question-id related to this rule
            var _questionId2 = $(_parent).attr('current-question-id');

            // single jump, as this rule is applied only on singled answer question
            var _defaultJumpId = _parent.find('.dl-single-answer-container').attr('data-selected-target-id');

            _tempQuestionObject = {question: _questionId2, rules: [], defaultJump: _defaultJumpId};

            submittedFormJson.questions.push(_tempQuestionObject);

            _parent.empty();

            _type = 'defaultJump';
            updateSelectedAnswersRules(_type, _questionId2);


        } else { // other rules (3 rules)

            // find question-id related to this rule
            var _questionId = $(_parent).attr('current-question-id');

            // find all answers, and get each answer-id
            var _answersElements = _parent.find('.dl-single-answer-container');

            _tempQuestionObject = {question: _questionId, rules: [], defaultJump: ''};
            var _tempRuleObject = [];

            var _tempBool = true;


            if (isJsonFormHasQuestion(_questionId) === false) {

                // for each answer container, get the selected question option element (saved in parent!)
                // and related question-id. We need to test if there's a selected option!
                $(_answersElements).each(function (i, v) {

                    var _answerId = $(v).attr('data-answer-id');
                    var _targetId = $(v).attr('data-selected-target-id');
                    var _price = $(v).attr('data-price');
                    var _timeFrom = $(v).attr('data-time-from');
                    var _timeTo = $(v).attr('data-time-to');
                    _answerName = $(v).find('.dl-answer-text').text();

                    if (isNotDead(_price)) {
                        _tempRuleObject = {
                            answer: _answerId,
                            action: 'add',
                            target: 'price',
                            value: _price,
                            answerName: _answerName
                        };

                        // if already in variables array, ignore.
                        if ($.inArray("price", submittedFormJson.variables) === -1) {
                            submittedFormJson.variables.push("price");

                        }

                        _tempQuestionObject.rules.push(_tempRuleObject);
                        _type = 'normalJump';
                    }
                    if (isNotDead(_targetId)) {
                        if (isNotDead(_timeFrom) && isNotDead(_timeTo)) {
                            // between jump
                            console.log('answer text');
                            console.log(v);

                            // create a temp rule object
                            _tempRuleObject = {
                                answer: _answerId,
                                answerName: _answerName,
                                action: 'between',
                                target: _targetId,
                                value: _timeFrom + '_' + _timeTo
                            };
                            _tempQuestionObject.rules.push(_tempRuleObject);
                            _type = 'normalJump';


                        } else {
                            // normal jump
                            // create a temp rule object
                            _tempRuleObject = {
                                answer: _answerId,
                                target: _targetId,
                                action: 'jump',
                                answerName: _answerName
                            };
                            _tempQuestionObject.rules.push(_tempRuleObject);

                            _type = 'normalJump';

                        }
                    }
                });

            } else {
                _tempBool = false;
            }

            // it's okay to add it!
            if (_tempBool) {
                submittedFormJson.questions.push(_tempQuestionObject);
                updateSelectedAnswersRules(_type, _questionId);
            }

            // Empty answer container
            _parent.empty();
        }

        $('#rulesFormModal').modal('hide');

        showNotification(AlertColors._INFO, 'Rule saved, please continue ...');
    });


    function updateSelectedAnswersRules(type, id) {
        // var _questions;
        // _questions = submittedFormJson.questions;
        var _liObj;
        var _button;

        _liObj = findLiWithId(id);

        _button = $(_liObj).find('button');
        _button.text('View rule');
        _button.attr('actionType', type);
        _button.removeClass('dl-add-jump-btn dl-add-rule-btn').addClass('dl-show-question-rule');
        _button.removeClass('btn-info').addClass('dl-show-question-rule btn-danger');
    }

    // find li of id in selected questions area
    function findLiWithId(id) {
        var res = '';
        var _questionsElements = $(selectedQuestionsItems).find('li');

        $(_questionsElements).each(function (i, v) {
            var _id = $(v).attr('data-question-id');

            if (_id === id) {
                res = v;
                console.log('found!');
                return false;
            }
        });
        return res;
    }


    $(document).on('click', '.dl-show-question-rule', function (e) {
        e.preventDefault();

        var type = $(this).attr('actionType');

        $('#showQuestionRulesModal').modal('show');

        var _parent = $('.dl-show-single-rule-container');
        _parent.empty();

        var _questionId = $(this).parent().attr('data-question-id');
        var _question = getQuestionWithRulesById(submittedFormJson.questions, _questionId);

        var _name;
        var _rules;
        var tmpObj;

        switch (type) {
            // default jump for questions with no answers
            case "defaultJump":
                _name = getQuestionNameById(_question.defaultJump);
                tmpObj = {type: 'Default Jump', name: _name};
                _parent.append(defaultJumpRuleTemplate(tmpObj));
                break;

            case 'normalJump':
                // normal jump rule in select questions
                _rules = _question.rules;
                $(_rules).each(function (i, v) {

                    if (v.action === "jump") {
                        _name = getQuestionNameById(v.target);
                        tmpObj = {type: 'Normal Jump', name: _name, answerName: v.answerName};
                        _parent.append(normalJumpRuleTemplate(tmpObj));
                    } else if (v.action === "between") {
                        _name = getQuestionNameById(v.target);
                        tmpObj = {type: 'Between Jump', name: _name, answerName: v.answerName, time: v.value};
                        _parent.append(betweenJumpRuleTemplate(tmpObj));
                    } else if (v.action === "add") {
                        _name = getQuestionNameById(v.target);
                        tmpObj = {type: 'Price', name: _name, answerName: v.answerName, price: v.value};
                        _parent.append(priceJumpRuleTemplate(tmpObj));
                    }
                });
                break;
        }

    });

    function getQuestionNameById(id) {
        var _res = '';

        console.log(allQuestions);
        $(allQuestions).each(function (i, v) {

            if (v._id === id) {
                _res = v.text;
                return false;
            }
        });

        return _res;
    }

    function getQuestionWithRulesById(data, id) {
        var _res = '';

        $(data).each(function (i, v) {
            if (v.question === id) {
                _res = v;
                return false;
            }
        });

        return _res;
    }

    // Submitting the form
    $(document).on('click', '#dl-submit-form', function (e) {
        e.preventDefault();

        // find all selected <li> elements
        var _questionsElements = $(selectedQuestionsItems).find('li');

        // each of the previous elements contains data-index as index of the question
        // in the main array of questions, so we need to get related question to each index
        $(_questionsElements).each(function (position, v) {
            var _tempIndex = $(v).attr('data-index');
            // iterate on each question that's in submitted JSON (added via rules appending)
            // and if there's already a question, just add a position from <li> elements index.
            if (isJsonFormHasQuestion(allQuestions[_tempIndex]._id) === true) {
                appendPositionToQuestionInForm(position + 1, allQuestions[_tempIndex]._id);
            } else {
                var _tempObj = {question: allQuestions[_tempIndex]._id, position: position + 1};
                submittedFormJson.questions.push(_tempObj);
            }
        });

        // get message text
        var _message = $('#dl-form-message').val();

        if (_message.length >= 5) {
            submittedFormJson.message = _message;
        } else {
            showNotification(AlertColors._WARNING, 'Submitting message is too short!');
            return 0;
        }

        var _name = $('#form-name').val();

        if (_name.length >= 5) {
            submittedFormJson.name = _name;
        } else {
            showNotification(AlertColors._WARNING, 'Form name is too short!');
            return 0;
        }

        submittedFormJson.pointsMapping.pointA = pointA;
        submittedFormJson.pointsMapping.pointB = pointB;
        submittedFormJson.pointsMapping.pointC = pointC;

        console.log(JSON.stringify(submittedFormJson, null, 2));

        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: _opsEP + "/forms",
            data: JSON.stringify(submittedFormJson),
            beforeSend: function (xhr) {
                setupHeaders(xhr);
            },
            success: function (response) {
                $('.page-loader-wrapper.process').fadeOut();
                console.log(response);
                showNotification(AlertColors._SUCCESS, AlertStrings._CREATE_SUCCESS);
                location.reload();

            },
            error: function (response) {
                errorBehaviour(response);
                showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
            }
        });
    });

    $(document).on('change', '.dl-selected-questions', function (e) {
        e.preventDefault();

        var _parentPoint = $(this).closest(".body").attr('data-point');

        var key = $(this).attr('data-key');
        var value = $(this).val();

        if (!isNotDead(value)) {
            value = $(this).siblings('.dl-default-value').text();
        }

        var _temp = {};
        _temp[key] = value;

        switch (_parentPoint) {
            case 'pointA':
                $.extend(pointA, _temp);
                break;
            case 'pointB':
                $.extend(pointB, _temp);
                break;
            case 'pointC':
                $.extend(pointC, _temp);
                break;
        }

        console.log(pointA);
    });

    function getNameFromDataById(data, id) {
        var _res = '';
        $(data).each(function (i, v) {
            if (v._id === id) {
                _res = v.text;
                return false;
            }
        });

        return _res;
    }

    function geObjInQuestionFromDataById(data, id) {
        var _res = '';
        $(data).each(function (i, v) {
            if (v.question._id === id) {
                _res = v;
                return false;
            }
        });

        return _res;
    }

    $(document).on('click', '.dl-modal-preview-single-form', function (e) {
        e.preventDefault();

        var _modal = $('#singleFormModal');
        var _modalBody = _modal.find('.modal-body');
        _modalBody.empty();
        var _temp;
        var _tmpObj;

        $.when(getFormById($(this).attr('data-form-id'))).then(function (data) {

            $(data.form).each(function (i, question) {
                // each question has different template according to its rules
                if (isNotEmpty(question.defaultJump)) {
                    console.log('sssssss');
                    _temp = getQuestionById(data.form, question.defaultJump).question.text;
                    _tmpObj = {v: question, jumpTo: _temp};
                    _modalBody.append(questionInFormRuleDefaultJumpTemplate(_tmpObj));
                } else {
                    // here, we have 3 rules: jump, time range with jump and price
                    // or no rules at all!
                    if (isNotEmpty(question.rules)) {
                        _modalBody.append(questionInFormRulesTemplate(question));

                        var _parent = $('div').find('[data-question-id=' + question._id + ']');
                        var _res = '';
                        var _tmpAnswer = '';

                        $(question.rules).each(function (i, rule) {
                            _tmpAnswer = getNameFromDataById(question.question.answers, rule.answer);
                            switch (rule.action) {
                                case "add":
                                    _res = $('<p>' + _tmpAnswer + ' -> Added Price: ' + rule.value + '</p>');
                                    break;
                                case "between":
                                    _res = $('<p>' + _tmpAnswer + ' -> Will Jump to: ' + geObjInQuestionFromDataById(data.form, rule.target).question.text + ' -> In Range: ' + rule.value + '</p>');
                                    break;
                                case "jump":
                                    _res = $('<p>' + _tmpAnswer + ' -> Will Jump to: ' + geObjInQuestionFromDataById(data.form, rule.target).question.text + '</p>');
                                    break;
                            }
                            $(_parent).append(_res);
                        });

                    } else {
                        _modalBody.append(questionInFormRulesTemplate(question));
                    }
                }
            });
        });

        _modal.modal('show');

    });
    //endregion

    //region SERVICES

    $(document).on('submit', '#dl-save-service', function (e) {
        e.preventDefault();
        var _formsDropDown = $('#dl-forms-dropdown');
        var _categoriesDropDown = $('#dl-categories-dropdown');

        $.when(uploadImage('#dl-service-image')).then(function (res) {
            submittedServiceJson.name = $('#dl-service-name').val();
            submittedServiceJson.nameAr = $('#dl-service-namear').val();
            submittedServiceJson.description = $('#dl-service-description').val();
            submittedServiceJson.descriptionAr = $('#dl-service-descriptionar').val();
            submittedServiceJson.price = $('#dl-service-price').val();
            submittedServiceJson.type = $('#dl-service-type').find(":selected").val();
            submittedServiceJson.form = _formsDropDown.find(":selected").val();
            submittedServiceJson.categoryId = _categoriesDropDown.find(":selected").val();
            submittedServiceJson.image = res.url;

            if (_formsDropDown.find('option:selected').index() === 0) {
                showNotification(AlertColors._WARNING, AlertStrings._CREATE_SERVICE_ENTER_FORM);
                return;
            }

            if (_categoriesDropDown.find('option:selected').index() === 0) {
                showNotification(AlertColors._WARNING, AlertStrings._CREATE_SERVICE_ENTER_CATEGORY);
                return;
            }

            $.ajax({
                type: "POST",
                contentType: 'application/json',
                url: _opsEP + "/services",
                data: JSON.stringify(submittedServiceJson),
                beforeSend: function (xhr) {
                    setupHeaders(xhr);
                },
                success: function () {
                    $('.page-loader-wrapper.process').fadeOut();
                    showNotification(AlertColors._SUCCESS, AlertStrings._CREATE_SUCCESS);
                    location.reload();
                },
                error: function (response) {
                    errorBehaviour(response);
                    showNotification(AlertColors._WARNING, AlertStrings._UNPROCESSABLE_ENTITY);
                }
            });
        });
    });

    function loadServicesIntoUI() {
        $.when(getServices()).then(function () {
            var _parent = $('.dl-preview-services-container');
            _parent.empty();

            $(allServices).each(function (i, v) {
                console.log(v.form);

                _parent.append(
                    $('<div />')
                        .addClass('col-lg-3 col-md-3 col-sm-6 col-xs-12')
                        .appendTo(_parent).append(
                        $('<div />')
                            .addClass('card')
                            .appendTo(_parent).append(
                            $('<div/>').addClass('header clearfix')
                                .appendTo(_parent).append($('<i>')
                                .addClass('pull-right material-icons col-red dl-delete')
                                .attr('data-endpoint', '/services/')
                                .attr('data-render', 'dl-get-services')
                                .attr('data-id', v._id)
                                .html('delete')))
                            .appendTo(_parent).append(
                            $('<div />')
                                .addClass('body dl-preview-single-service-' + i)
                        )
                    )
                );

                $('.dl-preview-single-service-' + i).jsonForm({
                    "schema": {
                        "name": {
                            "type": "string",
                            "title": "Service text in ENGLISH"
                        },
                        "nameAr": {
                            "type": "string",
                            "title": "Service text in ARABIC"
                        },
                        "description": {
                            "type": "string",
                            "title": "Service description in ENGLISH"
                        },
                        "descriptionAr": {
                            "type": "string",
                            "title": "Service description in ARABIC"
                        },
                        "type": {
                            "type": "string",
                            "title": "Service type"
                        },
                        "price": {
                            "type": "number",
                            "title": "Service price"
                        },
                        "form": {
                            "type": "string",
                            "title": "Linked to Form:"
                        }
                    },
                    "form": [
                        {
                            "key": "name",
                            "disabled": true
                        },
                        {
                            "key": "nameAr",
                            "disabled": true
                        },
                        {
                            "key": "description",
                            "disabled": true
                        },
                        {
                            "key": "descriptionAr",
                            "disabled": true
                        },
                        {
                            "key": "price",
                            "disabled": true
                        },
                        {
                            "key": "type",
                            "disabled": true
                        },
                        {
                            "key": "form",
                            "disabled": true
                        }
                    ],
                    "value": {
                        "name": v.name,
                        "nameAr": v.nameAr,
                        "description": v.description,
                        "descriptionAr": v.descriptionAr,
                        "price": v.price,
                        "type": v.type,
                        "form": v.form.name,
                    }
                });

            });
        });
    }

    //endregion

    //region CARDS

    $(document).on('submit', '#dl-save-card', function (e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append('image', $('input[type=file]')[0].files[0]);

        $.when(uploadImage('#dl-card-image')).then(function (res) {
            submittedCardJson.title = $('#dl-card-title').val();
            submittedCardJson.titleAr = $('#dl-card-titlear').val();
            submittedCardJson.headerText = $('#dl-card-header').val();
            submittedCardJson.headerTextAr = $('#dl-card-headerar').val();
            submittedCardJson.description = $('#dl-card-description').val();
            submittedCardJson.descriptionAr = $('#dl-card-descriptionar').val();
            submittedCardJson.image = res.url;
            submittedCardJson.type = $('#dl-service-type').find(":selected").val();
            submittedCardJson.service = $('#dl-service').find(":selected").val();
            submittedCardJson.expiresAt = $('#dl-card-expires').val();

            $.ajax({
                type: "POST",
                contentType: 'application/json',
                url: _opsEP + "/cards",
                data: JSON.stringify(submittedCardJson),
                beforeSend: function (xhr) {
                    setupHeaders(xhr);
                },
                success: function () {
                    $('.page-loader-wrapper.process').fadeOut();
                    showNotification(AlertColors._SUCCESS, AlertStrings._CREATE_SUCCESS);
                    location.reload();
                },
                error: function (response) {
                    errorBehaviour(response);
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                }
            });
        });
    });

    function loadCardsIntoUI() {
        $.when(getCards()).then(function () {
            var _parent = $('.dl-preview-cards-container');
            _parent.empty();

            $(allCards).each(function (i, v) {
                $(_parent).append(cardTemplate(v));
            });
        });
    }

    function loadFormsIntoUI() {
        // fetching & rendering
        $.when(getForms()).then(function () {
            var _parent = $('.dl-preview-forms-container');

            _parent.empty();

            $(allForms).each(function (i, v) {
                _parent.append(
                    $('<div />')
                        .addClass('col-lg-3 col-md-3 col-sm-6 col-xs-12')
                        .appendTo(_parent).append(
                        $('<div />')
                            .addClass('card')
                            .appendTo(_parent).append(
                            $('<div />')
                                .addClass('header dl-preview-single-form clearfix')
                                .appendTo(_parent).append(
                                $('<h2 />')
                                    .html(v.name)
                                    .addClass('pull-left'))
                                .appendTo(_parent).append($('<i>')
                                .addClass('pull-right material-icons col-red dl-delete')
                                .attr('data-endpoint', '/forms/')
                                .attr('data-render', 'dl-get-forms')
                                .attr('data-id', v._id)
                                .html('delete')))
                            .appendTo(_parent).append(
                            $('<div />')
                                .addClass('body clearfix')
                                .appendTo(_parent).append(
                                $('<p />')
                                    .addClass('dl-small-p')
                                    .html('(' + v.questions.length + ') questions'))
                                .appendTo(_parent).append(
                                $('<button />')
                                    .attr('data-form-id', v._id)
                                    .addClass('btn btn-danger btn-lg pull-right dl-modal-preview-single-form')
                                    .html('Preview'))
                        ))
                );
            });
        });
    }

    //endregion

    //region CATEGORY

    $(document).on('submit', '#dl-save-category', function (e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append('image', $('input[type=file]')[0].files[0]);

        $.when(uploadImage('#dl-category-image')).then(function (res) {
            submittedCategoryJson.title = $('#dl-category-title').val();
            submittedCategoryJson.titleAr = $('#dl-category-titlear').val();
            submittedCategoryJson.image = res.url;
            submittedCategoryJson.type = $('#dl-service-type').find(":selected").val();

            $.ajax({
                type: "POST",
                contentType: 'application/json',
                url: _opsEP + "/categories",
                data: JSON.stringify(submittedCategoryJson),
                beforeSend: function (xhr) {
                    setupHeaders(xhr);
                },
                success: function () {
                    $('.page-loader-wrapper.process').fadeOut();
                    showNotification(AlertColors._SUCCESS, AlertStrings._CREATE_SUCCESS);
                    location.reload();
                },
                error: function (response) {
                    errorBehaviour(response);
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                }
            });
        });
    });

    function loadCategoriesIntoUI() {
        $.when(getCategories()).then(function () {
            var _parent = $('.dl-preview-categories-container');
            _parent.empty();

            console.log('empty');
            $(allCategories).each(function (i, v) {
                $(_parent).append(categoryTemplate(v));
                appendCategory(v);
            });
        });
    }

    function appendCategory(item) {
        var _parent = $("#" + item._id);

        $(item.services).each(function (i, v) {
            $(_parent).append($('<p />').html(v.name));
        });
        $(_parent).append($('<hr />'));
    }


    //endregion

    //region COUPONS

    $(document).on('submit', '#dl-save-coupon', function (e) {
        e.preventDefault();

        submittedCouponJson.title = $('#dl-coupon-title').val();
        submittedCouponJson.code = $('#dl-coupon-code').val();
        submittedCouponJson.type = $('#dl-coupon-type').find(":selected").val();
        $('#dl-service').find(':selected').each(function () {
            submittedCouponJson.services.push($(this).val());
        });
        submittedCouponJson.amount = $('#dl-coupon-amount').val();
        submittedCouponJson.expiresAt = $('#dl-coupon-expires').val();

        console.log(JSON.stringify(submittedCouponJson, null, 2));
        //
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: _opsEP + "/coupons",
            data: JSON.stringify(submittedCouponJson),
            beforeSend: function (xhr) {
                setupHeaders(xhr);
            },
            success: function (response) {
                $('.page-loader-wrapper.process').fadeOut();
                console.log(response);
                showNotification(AlertColors._SUCCESS, AlertStrings._CREATE_SUCCESS);
                location.reload();
            },
            error: function (XMLHttpRequest, response) {
                $('.page-loader-wrapper.process').fadeOut();

                if (XMLHttpRequest.status === 409) {
                    showNotification(AlertColors._WARNING, 'Coupon Code already exist!');
                } else {
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);

                }

                console.log(response);
            }
        });
    });

    $(document).on('change', '#dl-coupon-type', function (e) {

        var _parent = $('#dl-amount-label');

        var _value = $(this).val();

        if (_value === 'percentage') {
            $(_parent).html('Amount (%)');
            $("#dl-coupon-amount").attr({
                "max": 100,
                "min": 1
            });
        } else {
            $(_parent).html('Amount (Fixed value, for example: 500 S.P)');
            $("#dl-coupon-amount").attr({
                "max": '',
                "min": '1'
            });
        }
    });

    function loadCouponsIntoUI() {
        $.when(getCoupons()).then(function () {
            var _parent = $('.dl-preview-coupons-container');
            _parent.empty();

            $(allCoupons).each(function (i, v) {
                $(_parent).append(couponTemplate(v));
                appendServicesToCoupon(v);
            });
        });
    }

    //endregion

    //region SERVICE PROVIDER

    $(document).on('change', '#dl-service-provider-type', function (e) {
        e.preventDefault();

        var _type = $(this).val();

        if (_type === 'driver') {
            $('.dl-service-provider-data-car').append(carCreateTemplate());
        } else {
            $('.dl-service-provider-data-car').empty();
        }
    });

    $(document).on('submit', '#dl-save-service-provider', function (e) {
        e.preventDefault();
        var _type = $('#dl-service-provider-type').val();

        console.log('type is: ');
        console.log(_type);

        if (_type === 'driver') {
            $.when(uploadImage('#dl-car-license')).then(function (res) {
                var formData = new FormData();
                formData.append('image', $('input[type=file]')[0].files[0]);

                submittedCarJson.brand = $('#dl-car-brand').val();
                submittedCarJson.model = $('#dl-car-model').val();
                submittedCarJson.seats = $('#dl-car-seats').val();
                submittedCarJson.bags = $('#dl-car-bags').val();
                submittedCarJson.type = $('#dl-car-type').find(":selected").val();
                submittedCarJson.licensePicture = res.url;
                submittedServiceProviderJson.car = submittedCarJson;
            });
        }

        submittedServiceProviderJson.type = _type;
        submittedServiceProviderJson.firstName = $('#dl-service-provider-firstname').val();
        submittedServiceProviderJson.lastName = $('#dl-service-provider-lastname').val();
        submittedServiceProviderJson.syrianNumber = $('#dl-service-provider-syriannumber').val();
        submittedServiceProviderJson.lebaneseNumber = $('#dl-service-provider-lebanesenumber').val();
        submittedServiceProviderJson.homeNumber = $('#dl-service-provider-homenumber').val();
        submittedServiceProviderJson.whatsApp = $('#dl-service-provider-whatsapp').val();
        submittedServiceProviderJson.address = $('#dl-service-provider-address').val();
        submittedServiceProviderJson.memberShipId = $('#dl-service-provider-membershipid').val();
        submittedServiceProviderJson.memberShip = $('#dl-service-provider-membership').find(":selected").val();
        submittedServiceProviderJson.birthday = $('#dl-service-provider-birthday').val();
        submittedServiceProviderJson.driverSince = $('#dl-service-provider-since').val();

        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: _opsEP + "/drivers",
            data: JSON.stringify(submittedServiceProviderJson),
            beforeSend: function (xhr) {
                setupHeaders(xhr);
            },
            success: function (response) {
                $('.page-loader-wrapper.process').fadeOut();
                console.log(response);
                showNotification(AlertColors._SUCCESS, AlertStrings._CREATE_SUCCESS);
                location.reload();
            },
            error: function (XMLHttpRequest, response) {
                $('.page-loader-wrapper.process').fadeOut();
                showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                console.log(response);
            }
        });
    });


    function loadProvidersIntoUI() {
        $.when(getProviders()).then(function () {
            var _parent = $('.dl-preview-providers-container');
            _parent.empty();

            $(allProviders).each(function (i, v) {
                console.log(v);
                if (isNotDead(v.car)) {
                    $(_parent).append(driverTemplate(v));
                } else {
                    $(_parent).append(providerTemplate(v));
                }


            });
        });
    }

    //endregion

    //region ORDERS

    //todo: can be improved
    $(document).on('change', '.filter-dropdown', function (e) {
        e.preventDefault();

        var filterObj = {category: '', service: '', status: ''};

        var filtersParents = $('.filter-dropdown :selected');

        $(filtersParents).each(function (i, v) {
            var filterKey = $(v).parent().attr('data-key');
            var value = $(v).val();

            if (isNotDead(value)) {
                switch (filterKey) {
                    case 'category':
                        filterObj.category = filterKey + '=' + value;
                        break;
                    case 'service':
                        filterObj.service = filterKey + '=' + value;
                        break;
                    case 'status':
                        filterObj.status = filterKey + '=' + value;
                        break;
                }
            }
        });

        console.log(filterObj);
        var filter = filterObj.service + '&' + filterObj.category + '&' + filterObj.status;

        updateOrdersTableBy(filter);
    });

    // viewing order details
    $(document).on('click', '.dl-order-view-details', function (e) {
        e.preventDefault();
        var _parent = $('.dl-show-single-order-container');
        _parent.empty();

        var _orderId = $(this).attr('data-order-id');

        $.when(getSingleOrder(_orderId)).then(function (res) {
            console.log(res);

            _parent.append(singleOrderTemplate(res));
            $('.dl-status-value').val(res.status);
            if (isNotDead(res.paymentStatus)) {
                $('.dl-payment-value').val(res.paymentStatus);
            }
            if (isNotDead(res.itemStatus)) {
                $('.dl-item-value').val(res.itemStatus);
            }
            $('#showOrderDetails').modal('show');
        });
    });

    $(document).on('change', '.dl-single-order-status-container', function (e) {
        var _orderId = $(this).attr('data-order-id');
        var _selectedValue = $(this).val();
        var _endPoint = $(this).attr('data-endpoint');
        changeOrderStatus(_endPoint, _orderId, _selectedValue);
    });

    $(document).on('click', '.dl-cancel-order', function (e) {
        e.preventDefault();

        var _reasonToCancel = $('.dl-single-order-cancel-container').val();

        if (_reasonToCancel !== '') {
            var _orderId = $(this).attr('data-order-id');
            changeOrderStatus('status', _orderId, 'canceled', _reasonToCancel);
        } else {
            showNotification(AlertColors._DANGER, 'Please select cancel reason.');
        }
    });

    function resetSelectedFilters() {
        $('.filter-dropdown').val('');
    }

    function changeOrderStatus(endPoint, id, status, reason) {

        var _data = {};

        switch (endPoint) {
            case 'status':
                _data = {'status': status, 'cancelReason': reason};
                break;
            case 'payment_status':
                _data = {'paymentStatus': status};
                break;
            case 'item_status':
                _data = {'itemStatus': status};
                break;
        }

        return $.when(
            $.ajax({
                type: "PATCH",
                contentType: 'application/json',
                url: _opsEP + "/orders/" + id + '/' + endPoint,
                data: JSON.stringify(_data),
                beforeSend: function (xhr) {
                    setupHeaders(xhr);
                },
                success: function (response) {
                    $('.page-loader-wrapper.process').fadeOut();
                    console.log(response);
                    showNotification(AlertColors._SUCCESS, 'Edited successfully!');
                    updateOrdersTableBy('');
                    resetSelectedFilters();
                    $('#showOrderDetails').modal('hide');
                },
                error: function (XMLHttpRequest, response) {
                    $('.page-loader-wrapper.process').fadeOut();
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                    console.log(response);
                }
            })
        );
    }

    //endregion

    //region OTHERS

    //todo: remove data-render from all delete icons, and find a way to reload data without reloading page!
    $(document).on('click', '.dl-delete', function (e) {
        e.preventDefault();

        var ep = $(this).attr('data-endpoint');
        var id = $(this).attr('data-id');

        $.ajax({
            type: "DELETE",
            contentType: 'application/json',
            url: _opsEP + ep + id,
            beforeSend: function (xhr) {
                $('.page-loader-wrapper.process').fadeIn();
                xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
            },
            success: function (response) {
                $('.page-loader-wrapper.process').fadeOut();
                showNotification(AlertColors._INFO, "Deleted");
                location.reload();

                console.log(response);
            },
            error: function (XMLHttpRequest) {
                console.log(XMLHttpRequest.status);
                if (XMLHttpRequest.status === 400) {
                    showNotification(AlertColors._WARNING, "Can't delete item in use!");
                } else {
                    showNotification(AlertColors._DANGER, 'Error in delete.');
                }

                $('.page-loader-wrapper.process').fadeOut();
            }
        });

    });

    //endregion

    //endregion

    //region SESSION

    $('#sign_in').on('submit', function (e) {
        e.preventDefault();

        var _data = {"email": '', "password": ''};

        _data.email = $('#dl-email').val();
        _data.password = $('#dl-password').val();

        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: _apiEP + "/auth/ops/login",
            data: JSON.stringify(_data),
            beforeSend: function () {
                $('.page-loader-wrapper.process').fadeIn();
            },
            success: function (response) {
                $('.page-loader-wrapper.process').fadeOut();
                setSession(response);
                window.location = _mainDomain;
            },
            error: function (XMLHttpRequest) {
                console.log(XMLHttpRequest.status);

                if (XMLHttpRequest.status === 401) {
                    showNotification(AlertColors._DANGER, AlertStrings._SIGN_IN_AUTH_ERROR);
                }
                $('.page-loader-wrapper.process').fadeOut();
            }
        });


        // $('.page-loader-wrapper.process').fadeIn();
    });

    $(document).on('click', '#dl-logout', function (e) {
        e.preventDefault();
        destroySession();
        window.location.reload();
    });

    //todo: don't keep this here! It should be before .ready state
    function initSession() {
        _token = localStorage.getItem('token');
        _username = localStorage.getItem('username');
        _email = localStorage.getItem('email');
        _userId = localStorage.getItem('id');

        var _signInUrl = _mainDomain + '/sign-in.php';

        if (!(_token && _token.length)) {
            // go to log in page
            if (window.location.href !== _signInUrl) {
                window.location = _signInUrl;
            }
        }

    }

    function setSession(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.name);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('id', data.user.id);
    }

    function destroySession() {
        localStorage.clear();
    }

    //endregion

    //region THEME-RELATED

    //Widgets count
    $('.count-to').countTo();

    //Sales count to
    $('.sales-count-to').countTo({
        formatter: function (value, options) {
            return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ' ').replace('.', ',');
        }
    });

    $('#test-notification').on('click', function (e) {
        e.preventDefault();
        showNotification(AlertColors._DANGER, 'Hello there!');
    });

    function showNotification(colorName, text) {
        $.notify({
                message: text
            },
            {
                type: colorName,
                allow_dismiss: true,
                newest_on_top: true,
                timer: 800,
                placement: {
                    from: 'bottom',
                    align: 'right'
                },
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                },
                template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} p-r-35" role="alert">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<span data-notify="message">{2}</span>' +
                    '</div>'
            });
    }

    //endregionz

});