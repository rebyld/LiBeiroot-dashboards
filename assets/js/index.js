﻿$(function () {

    //region GLOBALS

    let _mainDomain = 'http://localhost/libeiroot-php';
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
    var submittedFormJson = {name: "", questions: [], message: ''};

    // services
    var allServices = [];
    var submittedServiceJson = {name: '', nameAr: '', description: '', descriptionAr: '', type: '', price: 0, form: ''};

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
    var allDrivers = [];
    var submittedDriverJson = {
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
        car: {}
    };
    var submittedCarJson = {
        brand: '',
        model: '',
        seats: 0,
        bags: 0,
        type: '',
        licensePicture: ''
    };

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

        // Success
        _CREATE_SUCCESS: 'Created Successfully!',

        // Info
        _INFO_UPLOADING_IMAGE: 'Uploading image...',
        _INFO_SUBMITTING: 'Uploading image...'
    };


    init();

    //endregion

    //region HELPERS

    //region GLOBALS

    function init() {
        initSession();

        let body = $('body');

        if (body.hasClass("forms")) {
            $('.dl-form-content').hide();
        }

        if (body.hasClass("services")) {
            getForms();
        }

        if (body.hasClass("cards") || body.hasClass("coupons")) {
            $.when(getServices()).then(function () {
                let _serviceSelect = $('#dl-service');

                $(allServices).each(function (i, v) {
                    _serviceSelect.append('<option value="' + v._id + '">' + v.name + '</option>');
                });
            });
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
                url: _opsEP + '/questions',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
                    $('.page-loader-wrapper.process').fadeIn();
                },
                success: function (response) {
                    $(response.data).each(function (index, value) {
                        allQuestions.push(value);
                    });
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    $('.page-loader-wrapper.process').fadeOut();
                    console.log(response);
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
                        "title": "Question name"
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

            case 'multi-select':
                schema = {
                    "name": {
                        "type": "string",
                        "required": true,
                        "title": "Question name"
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
                        "title": "Question name"
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
                    "name": {
                        "type": "string",
                        "required": true,
                        "title": "Question name"
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

            case 'text-area':
                schema = {
                    "name": {
                        "type": "string",
                        "required": true,
                        "title": "Question name"
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
                            "title": "Submit"
                        }
                        : {}
                ];
                return keys;

            case 'multi-select':
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
                            "title": "Submit"
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
                            "title": "Submit"
                        }
                        : {}
                ];
                return keys;

            case 'text':
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

            case 'text-area':
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
                            "title": "Submit"
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

            case 'multi-select':
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

            case 'text-area':
                values = {
                    "name": _questionResult.name,
                    "text": _questionResult.text,
                    "textAr": _questionResult.textAr,
                    "type": type
                };
                return values;
        }
    }

    // In Preview: appending answers in each question, without the rules
    function getElemAnswers(data) {

        if (data.length <= 0) {
            return null;
        }
        var _res = $('<div class="dl-form-answers-container"><p>Answers:</p></div>');

        $(data).each(function (i, v) {
            _res.append(
                $('<div/>')
                    .addClass('dl-form-single-answer-container clearfix')
                    .attr('data-answer-id', v._id)
                    .appendTo(_res).append(
                    $('<p>')
                        .html('En: ' + v.text))
                    .appendTo(_res).append(
                    $('<p>')
                        .html('Ar: ' + v.textAr))
            );
        });

        return _res;
    }

    // after adding the answers, we need to show each answer rule, for that we'll need to
    // get the question details by id, also we need to find each answer id and match it
    // with the rules array.
    function getElemRules(obj, form) {
        $(obj.rules).each(function (i, v) {
            var answerElem = $('.dl-form-answers-container').find('[data-answer-id=' + v.answer + ']');

            $(answerElem).append(
                $('<span/>')
                    .addClass('label label-warning')
                    .html('This answer will jump to:')
            );

            $(answerElem).append(
                $('<p/>')
                    .addClass('')
                    .html(getQuestionById(form, v.jump).question.text)
            );
        });
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
                    xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
                    $('.page-loader-wrapper.process').fadeIn();
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
                    $('.page-loader-wrapper.process').fadeOut();
                    showNotification(AlertColors._DANGER, 'Couldn\'t get Forms, Please check your internet connection!');
                    console.log(response);
                }
            })
        );
    }

    function getFormById(id) {
        return $.when(
            $.ajax({
                type: "GET",
                contentType: 'application/json',
                url: _apiEP + "/forms/" + id,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
                    $('.page-loader-wrapper.process').fadeIn();
                },
                success: function () {
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    $('.page-loader-wrapper.process').fadeOut();
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                    console.log(response);
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
                    xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
                    $('.page-loader-wrapper.process').fadeIn();
                },
                success: function (response) {
                    $(response).each(function (index, value) {
                        allServices.push(value);
                    });
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    $('.page-loader-wrapper.process').fadeOut();
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                    console.log(response);
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
                    xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
                    $('.page-loader-wrapper.process').fadeIn();
                },
                success: function (response) {
                    $(response.cards).each(function (index, value) {
                        allCards.push(value);
                    });
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    $('.page-loader-wrapper.process').fadeOut();
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                    console.log(response);
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
                    xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
                    $('.page-loader-wrapper.process').fadeIn();
                },
                success: function (response) {
                    $(response).each(function (index, value) {
                        allCoupons.push(value);
                    });
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    $('.page-loader-wrapper.process').fadeOut();
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                    console.log(response);
                }
            })
        );
    }

    function appendServices(item) {
        var _parent = $("#" + item._id);

        $(item.services).each(function (i, v) {
            $(_parent).append($('<p />').html(v.name));
        });
        $(_parent).append($('<hr />'));
    }


    //endregion

    //region DRIVERS

    function getDrivers() {
        allDrivers = [];

        return $.when(
            $.ajax({
                type: "GET",
                contentType: 'application/json',
                url: _opsEP + "/drivers",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
                    $('.page-loader-wrapper.process').fadeIn();
                },
                success: function (response) {
                    $(response).each(function (index, value) {
                        allDrivers.push(value);
                    });
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    $('.page-loader-wrapper.process').fadeOut();
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                    console.log(response);
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
                    xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
                    $('.page-loader-wrapper.process').fadeIn();
                    showNotification(AlertColors._INFO, AlertStrings._INFO_UPLOADING_IMAGE);
                },
                success: function () {
                    $('.page-loader-wrapper.process').fadeOut();
                },
                error: function (response) {
                    $('.page-loader-wrapper.process').fadeOut();
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                    console.log(response);
                }
            })
        );
    }

    function getReadableDate(strangeDate) {
        return (new Date((new Date(strangeDate)).getTime())).toLocaleString();
    }

    function getReadableDateNoTime(strangeDate) {
        return (new Date((new Date(strangeDate)).getTime())).toLocaleDateString();
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
                $.ajax({
                    type: "POST",
                    contentType: 'application/json',
                    url: _opsEP + "/questions",
                    data: JSON.stringify(values),
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
                        $('.page-loader-wrapper.process').fadeIn();
                    },
                    success: function (response) {
                        $('.page-loader-wrapper.process').fadeOut();
                        _questionResult = response;
                        showNotification(AlertColors._SUCCESS, AlertStrings._CREATE_SUCCESS);
                    },
                    error: function (response) {
                        $('.page-loader-wrapper.process').fadeOut();
                        showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                        console.log(response);
                    }
                });
            }
        });
    });

    $('.dl-get-questions').on('click', function (e) {
        e.preventDefault();

        $.when(getQuestions()).then(function () {
            var _parent = $('.dl-preview-questions-container');
            _parent.empty();

            $(allQuestions).each(function (i, v) {
                _questionResult = v;
                var _type = v.type;

                _parent.append(
                    $('<div />')
                        .addClass('col-lg-3 col-md-3 col-sm-6 col-xs-12')
                        .appendTo(_parent).append(
                        $('<div />')
                            .addClass('card')
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
    });

    //endregion

    //region FORMS

    // this will prevent any bug on adding a second form by mistake.
    $(document).on('submit', '#dl-init-form', function (e) {
        e.preventDefault();

        $.when(getQuestions()).then(function () {
            var _parent = $('.dl-preview-questions-container');

            _parent.empty();

            // converting questions to UI elements so OPS can drag/drop questions
            $(allQuestions).each(function (i, v) {
                allQuestionsItems.append(
                    $('<li/>')
                        .addClass('ui-state-default clearfix card')
                        .html(v.name)
                        .attr('data-index', i)
                        .appendTo(allQuestionsItems).append(
                        '<p class="dl-small-p">' + v.answers.length + ' Answers</p>')
                );
            });
        });

        // show/hide some info
        $('.dl-form-content').show();
        $('.dl-init-form-container').hide();

        // init sorting plugin
        $("#sortable1, #sortable2").sortable({
            connectWith: ".connectedSortable"
        }).disableSelection();
    });

    // whenever we drag/drop, we will update some info on questions <li>
    selectedQuestionsItems.sortable({
        update: function (e, ui) {
            // check if the question has answers && the button hasn't been added before
            if (allQuestions[ui.item.attr('data-index')].answers.length && $(ui.item).find('button').length <= 0) {
                ui.item.append('<button class="btn btn-warning pull-right dl-add-rule-btn" data-index="' + ui.item.attr('data-index') + '">Add Rules</button>');
            }
        }
    });

    // render the question with related answers, along with append button to each answer
    $(document).on('click', '.dl-add-rule-btn', function (e) {
        e.preventDefault();

        var _question = allQuestions[$(this).attr('data-index')];

        $('.dl-question-text').html(_question.text);
        $('.dl-question-text-ar').html(_question.textAr);

        var _answerContainer = $('.dl-answers-container');
        _answerContainer.empty();

        // The question id that the rule is being appended to.
        _answerContainer.attr('current-question-id', _question._id);

        $(_question.answers).each(function (i, v) {
            _answerContainer.append(
                $('<div />')
                    .addClass('dl-single-answer-container')
                    .attr('data-answer-id', v._id)
                    .appendTo(_answerContainer).append(
                    '<p class="dl-answer-text">' + v.text + '</p>')
                    .appendTo(_answerContainer).append(
                    '<p class="dl-answer-text">' + v.textAr + '</p>')
                    .appendTo(_answerContainer).append(
                    '<button class="btn btn-info btn-sm dl-append-question-to-answer-btn">Append Question</button>')
                    .appendTo(_answerContainer).append(
                    '<div class="dl-dropdown-container"></div>')
            );
        });
    });

    // Showing a dropdown for each answer from selected questions only!
    $(document).on('click', '.dl-append-question-to-answer-btn', function (e) {
        e.preventDefault();

        // before adding options to dropdown, we need to update our data from selected questions area
        updateSelectedAnswer();

        var _parentContainer = $(this).parent().find('.dl-dropdown-container');
        _parentContainer.empty();

        _parentContainer.append(
            $('<select></select>')
                .addClass('dl-dropdown')
                .appendTo(_parentContainer).append(
                '<option>----</option>')
        );

        $(selectedQuestions).each(function (i, v) {
            _parentContainer.find('.dl-dropdown').append('<option data-question-id="' + v._id + '">' + v.text + '</option>');
        });
    });

    // on each change, we update the selected question id on the parent element for later use.
    // We're calling it here 'target question', which relate to the question that the answer
    // has to jump to upon selecting on mobile app.
    $(document).on('change', '.dl-dropdown', function () {
        var _answerElement = $(this).closest('.dl-single-answer-container');
        $(_answerElement).attr('data-selected-target-id', $('option:selected', this).attr('data-question-id'));
    });

    // save rule of question, main insertion to final form will be here
    $(document).on('click', '.dl-save-rules-btn', function (e) {
        e.preventDefault();

        // Parent elements that contains all answers
        var _parent = $('.dl-answers-container');

        // find question-id related to this rule
        var _questionId = $(_parent).attr('current-question-id');

        // find all answers, and get each answer-id
        var _answersElements = _parent.find('.dl-single-answer-container');

        var _tempQuestionObject = {question: _questionId, rules: []};
        var _tempRuleObject = [];

        var _tempBool = true;
        // for each answer container, get the selected question option element (saved in parent!)
        // and related question-id. We need to test if there's a selected option!
        $(_answersElements).each(function (i, v) {
            var _answerId = $(v).attr('data-answer-id');
            var _targetId = $(v).attr('data-selected-target-id');

            if (typeof _targetId !== typeof undefined && _targetId !== false) {
                // create a temp rule object
                if (isJsonFormHasQuestion(_questionId) === false) {
                    _tempRuleObject = {answer: _answerId, jump: _targetId};
                    _tempQuestionObject.rules.push(_tempRuleObject);
                } else {
                    _tempBool = false;
                }
            }
        });

        // it's okay to add it!
        if (_tempBool) {
            submittedFormJson.questions.push(_tempQuestionObject);
        }

        // Empty answer container
        _parent.empty();
    });

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

        // appending the form name to final submitted form
        submittedFormJson.name = $('#form-name').val();

        // get message text
        var _message = $('#dl-form-message').val();

        if (_message.length >= 5) {
            submittedFormJson.message = _message;
        } else {
            showNotification(AlertColors._WARNING, 'Message is too short!');
            return 0;
        }

        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: _opsEP + "/forms",
            data: JSON.stringify(submittedFormJson),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
                $('.page-loader-wrapper.process').fadeIn();
            },
            success: function (response) {
                $('.page-loader-wrapper.process').fadeOut();
                console.log(response);
                showNotification(AlertColors._SUCCESS, AlertStrings._CREATE_SUCCESS);

            },
            error: function (response) {
                $('.page-loader-wrapper.process').fadeOut();
                console.log(response);
                showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
            }
        });
    });

    $(document).on('click', '.dl-get-forms', function (e) {
        e.preventDefault();

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
                                .addClass('header dl-preview-single-form')
                                .appendTo(_parent).append(
                                $('<h2 />')
                                    .html(v.name)))
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

    });

    $(document).on('click', '.dl-modal-preview-single-form', function (e) {
        e.preventDefault();

        var _modal = $('#singleFormModal');
        var _modalBody = _modal.find('.modal-body');
        _modalBody.empty();

        $.when(getFormById($(this).attr('data-form-id'))).then(function (data) {
            $(data.form).each(function (i, v) {
                _modalBody.append(
                    $('<div/>')
                        .addClass('clearfix')
                        .appendTo(_modalBody).append(
                        $('<i>')
                            .addClass('m-r-10')
                            .html(v.position))
                        .appendTo(_modalBody).append(
                        $('<span>')
                            .addClass('clearfix')
                            .appendTo(_modalBody).append(
                            $('<span>')
                                .addClass('pull-left')
                                .appendTo(_modalBody).append(
                                $('<p>')
                                    .html(v.question.text))
                                .appendTo(_modalBody).append(
                                $('<p>')
                                    .html(v.question.textAr))
                                .appendTo(_modalBody).append(
                                getElemAnswers(v.question.answers)))
                            .appendTo(_modalBody).append(
                            $('<span>')
                                .addClass('m-l-10 pull-right label label-info')
                                .html((v.rules.length > 0) ? '(' + v.rules.length + ') rules' : 'no rules')))
                        .appendTo(_modalBody).append(
                        $('<hr>')));

                getElemRules(v, data.form);
            });
        });

        _modal.modal('show');

    });
    //endregion

    //region SERVICES

    $(document).on('submit', '#dl-save-service', function (e) {
        e.preventDefault();
        var _formsDropDown = $('#dl-forms-dropdown');

        submittedServiceJson.name = $('#dl-service-name').val();
        submittedServiceJson.nameAr = $('#dl-service-namear').val();
        submittedServiceJson.description = $('#dl-service-description').val();
        submittedServiceJson.descriptionAr = $('#dl-service-descriptionar').val();
        submittedServiceJson.price = $('#dl-service-price').val();
        submittedServiceJson.type = $('#dl-service-type').find(":selected").val();
        submittedServiceJson.form = _formsDropDown.find(":selected").val();

        if (_formsDropDown.find('option:selected').index() === 0) {
            showNotification(AlertColors._WARNING, AlertStrings._CREATE_SERVICE_ENTER_FORM);
            return;
        }

        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: _opsEP + "/services",
            data: JSON.stringify(submittedServiceJson),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
                $('.page-loader-wrapper.process').fadeIn();
            },
            success: function () {
                $('.page-loader-wrapper.process').fadeOut();
                showNotification(AlertColors._SUCCESS, AlertStrings._CREATE_SUCCESS);
            },
            error: function (response) {
                $('.page-loader-wrapper.process').fadeOut();
                showNotification(AlertColors._WARNING, AlertStrings._UNPROCESSABLE_ENTITY);
                console.log(response);
            }
        });
    });

    $('.dl-get-services').on('click', function (e) {
        e.preventDefault();

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
                        "form": v.form.name
                    }
                });

            });
        });
    });

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
                    xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
                    $('.page-loader-wrapper.process').fadeIn();
                },
                success: function () {
                    $('.page-loader-wrapper.process').fadeOut();
                    showNotification(AlertColors._SUCCESS, AlertStrings._CREATE_SUCCESS);
                },
                error: function (response) {
                    $('.page-loader-wrapper.process').fadeOut();
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                    console.log(response);
                }
            });
        });
    });

    $('.dl-get-cards').on('click', function (e) {
        e.preventDefault();

        $.when(getCards()).then(function () {
            var _parent = $('.dl-preview-cards-container');
            _parent.empty();

            $(allCards).each(function (i, v) {
                $(_parent).append(cardTemplate(v));
            });
        });
    });

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
                xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
                $('.page-loader-wrapper.process').fadeIn();
            },
            success: function (response) {
                $('.page-loader-wrapper.process').fadeOut();
                console.log(response);
                showNotification(AlertColors._SUCCESS, AlertStrings._CREATE_SUCCESS);
            },
            error: function (XMLHttpRequest, response) {
                $('.page-loader-wrapper.process').fadeOut();

                if (XMLHttpRequest.status === 409) {
                    showNotification(AlertColors._WARNING, 'Coupon Code already exist!');
                }
                else {
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);

                }

                console.log(response);
            }
        });
    });

    $('.dl-get-coupons').on('click', function (e) {
        e.preventDefault();

        $.when(getCoupons()).then(function () {
            var _parent = $('.dl-preview-coupons-container');
            _parent.empty();

            $(allCoupons).each(function (i, v) {
                $(_parent).append(couponTemplate(v));
                appendServices(v);
            });
        });
    });

    //endregion

    //region DRIVERS

    $(document).on('submit', '#dl-save-driver', function (e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append('image', $('input[type=file]')[0].files[0]);

        $.when(uploadImage('#dl-car-license')).then(function (res) {

            // car data
            submittedCarJson.brand = $('#dl-car-brand').val();
            submittedCarJson.model = $('#dl-car-model').val();
            submittedCarJson.seats = $('#dl-car-seats').val();
            submittedCarJson.bags = $('#dl-car-bags').val();
            submittedCarJson.type = $('#dl-car-type').find(":selected").val();
            submittedCarJson.licensePicture = res.url;

            // driver data
            submittedDriverJson.firstName = $('#dl-driver-firstname').val();
            submittedDriverJson.lastName = $('#dl-driver-lastname').val();
            submittedDriverJson.syrianNumber = $('#dl-driver-syriannumber').val();
            submittedDriverJson.lebaneseNumber = $('#dl-driver-lebanesenumber').val();
            submittedDriverJson.homeNumber = $('#dl-driver-homenumber').val();
            submittedDriverJson.whatsApp = $('#dl-driver-whatsapp').val();
            submittedDriverJson.address = $('#dl-driver-address').val();
            submittedDriverJson.memberShipId = $('#dl-driver-membershipid').val();
            submittedDriverJson.memberShip = $('#dl-driver-membership').find(":selected").val();
            submittedDriverJson.birthday = $('#dl-driver-birthday').val();
            submittedDriverJson.driverSince = $('#dl-driver-driversince').val();
            submittedDriverJson.car = submittedCarJson;

            $.ajax({
                type: "POST",
                contentType: 'application/json',
                url: _opsEP + "/drivers",
                data: JSON.stringify(submittedDriverJson),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'BEARER ' + _token);
                    $('.page-loader-wrapper.process').fadeIn();
                },
                success: function (response) {
                    $('.page-loader-wrapper.process').fadeOut();
                    console.log(response);
                    showNotification(AlertColors._SUCCESS, AlertStrings._CREATE_SUCCESS);
                },
                error: function (XMLHttpRequest, response) {
                    $('.page-loader-wrapper.process').fadeOut();
                    showNotification(AlertColors._DANGER, AlertStrings._NETWORK_ERROR);
                    console.log(response);
                }
            });
        });

    });

    $('.dl-get-drivers').on('click', function (e) {
        e.preventDefault();

        $.when(getDrivers()).then(function () {
            var _parent = $('.dl-preview-drivers-container');
            _parent.empty();

            $(allDrivers).each(function (i, v) {
                $(_parent).append(driverTemplate(v));
                console.log(v);
            });
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
            url: "https://libeiroot-dev.herokuapp.com/api/v1/auth/ops/login",
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

        var _signInUrl = _mainDomain + '/sign-in';

        if (!(_token && _token.length)) {
            // go to log in page
            if (window.location.href !== _signInUrl) {
                console.log(_signInUrl);
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

    //endregion

});