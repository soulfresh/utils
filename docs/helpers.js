const path = require('path');
const Handlebars = require('handlebars');


/**
 * Generate an index of the global functions.
 */
Handlebars.registerHelper('functionIndex', function (context) {
  // return JSON.stringify(arguments, null, 2);

  let output = '';

  try {
    let grouped = {};
    const funcList = context.data.root;
    for (let i = 0; i < funcList.length; i++) {
      const func = funcList[i];
      if (func.scope === 'global' && func.kind === 'function') {
        const filename = path.parse(func.meta.filename).name;

        if (!grouped[filename]) grouped[filename] = [];

        grouped[filename].push(func);
      }
    }


    Object.keys(grouped).forEach(name => {
      const group = grouped[name];

      // Give it a title
      output += `<b>${name}</b>`;

      // Add the list items
      output += '<ul>';
      group.forEach(func => {
        output += `<li>${context.fn(func)}</li>`;
      });
      output += '</ul>';
    });
  } catch(e) {
    console.error(e);
  }

  return output;
});

