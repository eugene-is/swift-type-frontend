import React from 'react';

import styles from './PrivacyPolicy.module.scss';

/**
 * Страница политика конфиденциальности
 *
 * @returns {JSX.Element} - отображаемая главная страница.
 */

export const PrivacyPolicy = () => {
	return (
		
		<div className={`${styles.themeContainer} ${styles.container}`}>
			<h1 className={`${styles.tittle} ${styles.themeText}`}>Политика конфиденциальности</h1>
			<div className={`${styles.block}`}>
				<p className={`${styles.text} ${styles.themeText}`}>
				Уважаемый пользователь,<br/>
				Благодарим вас за использование нашего веб-приложения. Мы ценим ваш интерес и доверие к нам. В связи с этим, мы хотим проинформировать вас о нашей политике конфиденциальности и обработки персональных данных.<br/>

				Ваша конфиденциальность имеет для нас высокий приоритет, и мы стремимся обеспечить защиту и безопасность ваших личных данных. Политика конфиденциальности, описанная ниже, объясняет, как мы собираем, используем и защищаем информацию, которую вы предоставляете нам при использовании нашего веб-приложения.<br/>

				Сбор и использование информации:<br/>

				Мы собираем только необходимую информацию, которая требуется для корректной работы нашего веб-приложения.
				Мы используем вашу электронную почту исключительно для целей аутентификации и связи с вами относительно вашей учетной записи.<br/>
				Мы не передаем вашу личную информацию третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством.<br/>
				Безопасность и хранение данных:<br/>

				Мы принимаем все необходимые меры для обеспечения безопасности ваших данных и защиты их от несанкционированного доступа или использования.<br/>
				Вся информация, которую вы предоставляете нам, хранится на защищенных серверах и подвергается строгим мерам безопасности.
				Согласие на обработку данных:<br/>

				Ваше использование нашего веб-приложения подразумевает ваше согласие с нашей политикой конфиденциальности и обработки персональных данных.<br/>
				Вы имеете право отозвать свое согласие в любое время, связавшись с нами по указанным контактным данным.
				Обновления политики конфиденциальности:<br/>

				Мы можем время от времени вносить изменения в нашу политику конфиденциальности. В случае внесения существенных изменений, мы уведомим вас об этом по указанной вами электронной почте.<br/>
				Продолжая использование нашего веб-приложения, вы соглашаетесь с нашей политикой конфиденциальности и обработки персональных данных. Если у вас возникнут вопросы или требуется дополнительная информация, пожалуйста, свяжитесь с нами по указанным ниже контактным данным.<br/>

				Спасибо за ваше внимание и доверие к нам.<br/>

				С уважением, Swift Type
				</p>
			</div>
		</div>
	);
};