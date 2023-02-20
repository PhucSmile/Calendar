/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './component/**/*.{js,ts,jsx,tsx}', './layout/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            dropShadow: {
                xl: ['3px 3px 0px #F6F6F6', '3px 3px 0px #99CCCC'],
            },
            colors: {
                primary: '#E4F6ED',
                secondary: '#91e0e04d',
                light_blue: '#5684AE',
                dark_blue: '#0F4C81',
                light_orange: '#FFE4C8',
                dark_orange: '#F9BE81',
                text: '#7A7B7A',
            },
            fontFamily: {
                SVNGilroy: 'SVN-Gilroy',
                Inter: 'Inter',
            },

            boxShadow: {
                checkbox: ['0px 5px 10px rgba(0, 0, 0, 0.1)'],
            },
        },
    },
    plugins: [],
    important: true,
};
