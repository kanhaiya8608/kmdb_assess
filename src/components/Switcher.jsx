import React, { useState } from 'react';
import useDarkSide from './Hook/useDarkSide';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function Switcher() {
const [colorTheme, setTheme] = useDarkSide();
const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

const toggleDarkMode = checked => {
setTheme(colorTheme);
setDarkSide(checked);
};

return (
<>
<div className='mb-4 md:mb-1 md:p-2'>
<DarkModeSwitch sunColor='orange' size={42} checked={darkSide} onChange={toggleDarkMode} />
</div>
</>
);
}