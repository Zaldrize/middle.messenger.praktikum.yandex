import Handlebars from 'handlebars'

export default function handlebars() {
    const fileRegExp = /\.hbs$|\.handlebars$/;
    return {
        name: 'vite-plugin-handlebars-precompile',
        transform(src, fileName) {
        if (!fileRegExp.test(fileName)) {
            return;
        }
        // vite превращает .hbs файл в .js
        // language=javascript
        const code = `
            import Handlebars from 'handlebars/runtime';
            export default Handlebars.template(${Handlebars.precompile(src)});
        `;
        return {
            code,
        };
        },
    };
}