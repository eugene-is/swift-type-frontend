import React from 'react';

import styles from './Keyboard.module.scss';

import { KeyButton } from '../'


export const Keyboard = () => {
  return (
		<div class>
      <div className={ styles.line }>
				<KeyButton id="letter_ё" letters="Ё" sup="ё" />
				<KeyButton id="letter_1" letters="1" sup="!"/>
				<KeyButton id="letter_2" letters="2" sup='"'/>
				<KeyButton id="letter_3" letters="3" sup="№"/>
				<KeyButton id="letter_4" letters="4" sup=";"/>
				<KeyButton id="letter_5" letters="5" sup="%"/>
				<KeyButton id="letter_6" letters="6" sup=":"/>
				<KeyButton id="letter_7" letters="7" sup="?"/>
				<KeyButton id="letter_8" letters="8" sup="*"/>
				<KeyButton id="letter_9" letters="9" sup="("/>
				<KeyButton id="letter_0" letters="0" sup=")"/>
				<KeyButton id="letter_minus" letters="-" sup="_"/>
				<KeyButton id="letter_plus" letters="=" sup="+"/>
				<KeyButton id="letter_backspace" spec="backspace" text="Backspace"/>
			</div>
			<div className={ styles.line }>
				<KeyButton id="letter_tab" spec="tab" text="Tab"/>
				<KeyButton id="letter_й" letters="Й" sup="Q"/>
				<KeyButton id="letter_ц" letters="Ц" sup="W"/>
				<KeyButton id="letter_у" letters="У" sup="E"/>
				<KeyButton id="letter_к" letters="К" sup="R"/>
				<KeyButton id="letter_е" letters="Е" sup="T"/>
				<KeyButton id="letter_н" letters="Н" sup="Y"/>
				<KeyButton id="letter_г" letters="Г" sup="U"/>
				<KeyButton id="letter_ш" letters="Ш" sup="I"/>
				<KeyButton id="letter_щ" letters="Щ" sup="O"/>
				<KeyButton id="letter_з" letters="З" sup="P"/>
				<KeyButton id="letter_х" letters="Х" sup="{"/>
				<KeyButton id="letter_ъ" letters="Ъ" sup="}"/>
				<KeyButton id="letter_slash" letters="\" sup="/"/>
			</div>
			<div className={ styles.line }>
				<KeyButton id="letter_capslock" spec="capslock" text="Caps Lock"  />
				<KeyButton id="letter_ф" letters="Ф" sup="A"/>
				<KeyButton id="letter_ы" letters="Ы" sup="S"/>
				<KeyButton id="letter_в" letters="В" sup="D"/>
				<KeyButton id="letter_а" letters="А" sup="F"/>
				<KeyButton id="letter_п" letters="П" sup="G"/>
				<KeyButton id="letter_р" letters="Р" sup="H"/>
				<KeyButton id="letter_о" letters="О" sup="J"/>
				<KeyButton id="letter_л" letters="Л" sup="K"/>
				<KeyButton id="letter_д" letters="Д" sup="L"/>
				<KeyButton id="letter_ж" letters="Ж" sup=":;"/>
				<KeyButton id="letter_э" letters="Э" sup="'\"/>
				<KeyButton id="letter_enter" spec="enter" text="Enter"  />
			</div>
			<div className={ styles.line }>
				<KeyButton spec="shift" text="Shift"/>
				<KeyButton id="letter_я" letters="Я" sup="Z"/>
				<KeyButton id="letter_ч" letters="Ч" sup="X"/>
				<KeyButton id="letter_с" letters="С" sup="C"/>
				<KeyButton id="letter_м" letters="М" sup="V"/>
				<KeyButton id="letter_и" letters="И" sup="B"/>
				<KeyButton id="letter_т" letters="Т" sup="N"/>
				<KeyButton id="letter_ь" letters="Ь" sup="M"/>
				<KeyButton id="letter_б" letters="Б" sup="<,"/>
				<KeyButton id="letter_ю" letters="Ю" sup=">."/>
				<KeyButton id="letter_dot" letters="." sup=",?"/>
				<KeyButton spec="shift" text="Shift"/>
			</div>
			<div className={ styles.line }>
        <KeyButton icon="globus" text="Alt"/>
        <KeyButton icon="fill" text="Alt"/>
				<KeyButton spec="space"/>
				<KeyButton spec="alt" text="Alt"/>
			</div>
		</div>
  );
};