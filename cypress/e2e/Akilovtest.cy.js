import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {
    
    beforeEach('Начало теста', function () { 
        cy.visit('/'); // зашли на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // цвет кнопки "Забыли пароль"
          });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // крестик виден пользователю
          });

    it('1.Верный пароль и верный логин', function () {

         cy.get(main_page.email).type(data.login); // ввели верный логин
         cy.get(main_page.password).type(data.password); // ввели верный пароль
         cy.get(main_page.login_button).click(); // клик по кнопке "Войти"
         
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // появилось окно авторизации
         cy.get(result_page.title).should('be.visible'); // окно 
     })
     it('2.Логика восстановления пароля', function () {
        
        cy.get(main_page.fogot_pass_btn).click(); // клик по кнопке "Забыли пароль"
        cy.get(recovery_password_page.email).type(data.login); // ввели верный логин
        cy.get(recovery_password_page.send_button).click(); // клик по кнопке "Восстановить"
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // окно 
    })
    it('3.Неверный пароль и верный логин', function () {

        cy.get(main_page.email).type(data.login); // ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio111'); // ввели неверный пароль
        cy.get(main_page.login_button).click(); // клик по кнопке "Войти"
        
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // окно 
    })
    it('4.верный пароль и неверный логин', function () {

        cy.get(main_page.email).type('german1@dolnikov.ru'); // ввели неверный логин
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // клик по кнопке "Войти"
        
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // окно 
    })
    it('5.неверный пароль и неверный логин без@', function () {

        cy.get(main_page.email).type('german1dolnikov.ru'); // ввели неверный логин
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // клик по кнопке "Войти"
        
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // окно 
    })
    it('6.приведение к строчным буквам в логине', function () {

        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // ввели неверный логин
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // клик по кнопке "Войти"
        
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // окно 
    })
 })
   
 
 
 
 