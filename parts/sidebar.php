<section>
    <aside id="leftsidebar" class="sidebar">
        <!-- User Info -->
        <div class="user-info">
            <div class="info-container">
                <div id="dl-ops-username" class="name"></div>
                <div id="dl-ops-email" class="email"></div>
            </div>
        </div>
        <!-- Menu -->
        <div class="menu">
            <ul class="list">
                <li class="header">MAIN NAVIGATION</li>

                <?php
                // Define each name associated with an URL
                $urls = array(
                    'home' => array(
                        'icon' => 'home',
                        'link' => '/',
                        'text' => 'Home',
                        'children' => array()
                    ),
                    'cards' => array(
                        'icon' => 'book',
                        'text' => 'Homepage Cards',
                        'children' => array(
                            'create' => array(
                                'link' => '/cards-create.html',
                                'text' => 'Create Card',
                            ),
                            'view' => array(
                                'link' => '/cards-view.html',
                                'text' => 'View Cards',
                            )
                        )
                    ),
                    'questions' => array(
                        'icon' => 'assignment',
                        'text' => 'Questions',
                        'children' => array(
                            'create' => array(
                                'link' => '/questions-create.html',
                                'text' => 'Create Question',
                            ),
                            'view' => array(
                                'link' => '/questions-view.html',
                                'text' => 'View Questions',
                            )
                        )
                    ),
                    'forms' => array(
                        'icon' => 'library_books',
                        'text' => 'Forms',
                        'children' => array(
                            'create' => array(
                                'link' => '/forms-create.html',
                                'text' => 'Create Forms',
                            ),
                            'view' => array(
                                'link' => '/forms-view.html',
                                'text' => 'View Forms',
                            )
                        )
                    ),
                    'services' => array(
                        'icon' => 'extension',
                        'text' => 'Services',
                        'children' => array(
                            'create' => array(
                                'link' => '/service-create.html',
                                'text' => 'Create Service',
                            ),
                            'view' => array(
                                'link' => '/service-view.html',
                                'text' => 'View Services',
                            )
                        )
                    ),
                    'coupons' => array(
                        'icon' => 'card_giftcard',
                        'text' => 'Coupons',
                        'children' => array(
                            'create' => array(
                                'link' => '/coupon-create.html',
                                'text' => 'Create Coupon',
                            ),
                            'view' => array(
                                'link' => '/coupon-view.html',
                                'text' => 'View Coupons',
                            )
                        )
                    ),
                    'Drivers' => array(
                        'icon' => 'local_car_wash',
                        'text' => 'Drivers',
                        'children' => array(
                            'create' => array(
                                'link' => '/driver-create.html',
                                'text' => 'Create Driver',
                            ),
                            'view' => array(
                                'link' => '/driver-view.html',
                                'text' => 'View Drivers',
                            )
                        )
                    ),

                );

                $currentPage = 'Home';

                foreach ($urls as $name => $array) {
                    if (count($array['children']) > 0) {
                        $children = $array['children'];
                        print('<li class="">
                                <a href="javascript:void(0);" class="menu-toggle waves-effect waves-block">
                                    <i class="material-icons">book</i>
                                    <span>' . $array["text"] . '</span>
                                </a>
                                <ul class="ml-menu">');
                        foreach ($children as $inner) {
                            print ('<li>
                                        <a href=' . DOMAIN_ROOT . $inner["link"] . '>' . $inner["text"] . '</a>
                                    </li>');
                        }

                        print ('</ul></li>');

                    } else {
                        print('<li class="">
                            <a href="' . DOMAIN_ROOT . $array["link"] . '">
                                <i class="material-icons">' . $array["icon"] . '</i>
                                <span>' . $array["text"] . '</span>
                            </a>
                        </li>');
                    }
                }
                ?>

            </ul>
        </div>
    </aside>
</section>
