window.onload = function () {
// здесь я прописал изменение классов, стилей для объектов
// также добавление и удоление селекторов
// слушатели событий "cklick"
// итератор для перебора масива с дивами
// в основном всё то что мы делали на парах
// самое интересное начинается с 41 строки

    btn_complex = document.querySelectorAll('.pro');
    btn_complex.forEach(function (value) {
        value.addEventListener('click', function (e) {
            btn_pro = document.querySelectorAll('.pro');
            btn_pro.forEach(function (el) {
                el.classList.remove('active');
                el.classList.add('program');
            });
            value.classList.remove('program');
            value.classList.add('active');
            name_content = value.classList[1];
            cont_complex = document.querySelectorAll('.cnt');
            cont_complex.forEach(function (vel) {
                velu = vel.classList[2];
                if (name_content !== velu) {
                    perent_vel = vel.parentElement;
                    perent_vel.classList.add("no-active");
                    perent_vel.style = null;
                    perent_vel.style.display = "none";
                } else {
                    perent_vel = vel.parentElement;
                    perent_vel.style.display = "flex";
                    perent_vel.classList.remove("no-active");
                    mHeight = perent_vel.offsetHeight;
                    perent_vel.style.maxHeight = mHeight + 'px';
                    perent_vel.style.transform = mHeight + 'px';

                }
            });
        });
    });

    // здесь я использую слушатель событий для скрола
    // при скроле на определённой высоте у меня должно появляться верхнее меню
    window.addEventListener("scroll", function () {
        let width_window = document.documentElement.clientWidth;//я узнаю ширину окна браузера
        let top2 = document.querySelector(".top2");
        // переменной scrolled присваиваю значение высоты на которую страница отклонилась от
        // первоначального значения по оси Y
        let scrolled = window.pageYOffset || document.documentElement.scrollTop;
        // так как у меня страница адаптирована под три устройства
        // высота появления меню разная на каждом формате
        if (width_window > 1400) {
            if (scrolled > 975) {
                top2.style.display = "flex";
            }
            if (975 > scrolled) {
                top2.style.display = "None";
            }
        } else {
            if (width_window <= 1400  &&  width_window >= 640) {
                if (scrolled > 970) {
                    top2.style.display = "flex";
                }
                if (970 > scrolled) {
                    top2.style.display = "None";
                }
            }
            if (640 > width_window && width_window > 310) {
                if (scrolled > 710) {
                    top2.style.display = "flex";
                }
                if (710 > scrolled) {
                    top2.style.display = "None";
                }
            }
        }
    });

    //  с 79 по 91 данная часть кода отвечает за плавный скрол при нажитии на ссылку по ID
    const anchors = document.querySelectorAll('a[href*="#"]');
    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const blockID = anchor.getAttribute('href').substr(1);

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };


    btn_details1 = document.querySelector('.details-1');
    btn_details1.addEventListener('click', function (eg) {
        btn_details1 = document.querySelector('.details-1');
        btn_details2 = document.querySelector('.details-2');
        cont3_cont2_desc_text = document.querySelectorAll('.cont-3-cont2-desc-text');
        btn_details1.style.display = "None";
        btn_details2.style.display = "flex";
        cont3_cont2_desc_text.forEach(function (ge) {
            ge.style.display = "flex";
        });
    });
    btn_details2 = document.querySelector('.details-2');
    btn_details2.addEventListener('click', function (eg) {
        btn_details1 = document.querySelector('.details-1');
        btn_details2 = document.querySelector('.details-2');
        cont3_cont2_desc_text = document.querySelectorAll('.cont-3-cont2-desc-text');
        btn_details2.style.display = "None";
        btn_details1.style.display = "flex";
        cont3_cont2_desc_text.forEach(function (ge) {
            ge.style.display = "None";
        });
    });

    btn_details3 = document.querySelector('.details-3');
    btn_details3.addEventListener('click', function (eg) {
        btn_details3 = document.querySelector('.details-3');
        btn_details4 = document.querySelector('.details-4');
        cont3_cont3_desc_text = document.querySelectorAll('.cont-3-cont3-desc-text');
        btn_details3.style.display = "None";
        btn_details4.style.display = "flex";
        cont3_cont3_desc_text.forEach(function (ge) {
            ge.style.display = "flex";
        });
    });
    btn_details4 = document.querySelector('.details-4');
    btn_details4.addEventListener('click', function (eg) {
        btn_details3 = document.querySelector('.details-3');
        btn_details4 = document.querySelector('.details-4');
        cont3_cont3_desc_text = document.querySelectorAll('.cont-3-cont3-desc-text');
        btn_details4.style.display = "None";
        btn_details3.style.display = "flex";
        cont3_cont3_desc_text.forEach(function (ge) {
            ge.style.display = "None";
        });
    });

    // здесь применяется ajax
    // так как я не делал настоящую обратную связь я хотел отпровлять данные через форму в шаблоне
    // мне сказали что лучше через js это сделать с помощью ajax
    $('.btn-1').on('click', function(){//слушатель событий 'click'
        $('.error-msg').html('');// делаем пустым див
        $('.form-callback').hide(); // скрываем див
        $('.form-response').show(); // показываем див
        $('.load-wrapp').show();
        $('.response-request').hide();
        $.post('/feedback.php',{ // постом отпровляем ассоциативный массив данных в на сервер
            name: $('.input-name').val(),
            city: $('.input-city').val(),
            phone: $('.input-phone').val(),
            captcha: $('.input-captcha').val(),
            email: $('.input-email').val()
        }, function(response){
            $('.load-wrapp').hide(); // показывается див с анимацией загрузки
            if('error'==response.result){ //если есть ошибки то они отображаются
                toastr.error(response.message);
                $('.form-callback').show();
                $.each(response.errors, function(name, value){
                    $('.error-msg.for-'+name).html(value);
                })
            } else { // если нет ошибок показывается див с текстом об успешной отправки
                toastr.success(response.message);
                $('.form-callback').hide();
                $('.form-response').show();
                $('.response-request').show();
            }
        });
    });

};
