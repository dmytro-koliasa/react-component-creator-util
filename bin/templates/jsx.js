const rootClassName = ({classnames, styleModule}) => {
  if(styleModule && classnames) {
    return `{cn(styles.root, className)}`
  } else if(!styleModule && classnames) {
    return `{cn("root", className)}`
  } else if(!classnames && styleModule) {
    return `{styles.root}`
  } else if(!styleModule && !classnames) {
    return `"root"`
  }
}

const returnJsx = ({ styleFile, fileName, styleModule, classnames }) => {
  if(!styleFile) {
    return `
      <div>
          ${fileName}
      </div>`
  }
  return `
      <div className=${rootClassName({classnames, styleModule})}>
          ${fileName}
      </div>`
}

const componentInitialization = ({ fileName, styleModule, typescript, styleFile, classnames, memo }) => {
  if(memo) {
    return `
export const ${fileName} = memo(({ className }${typescript ? `:${fileName}Props` : ''}) => {
  return (${returnJsx({ styleFile, fileName, styleModule, classnames })}
  );
});`
  }
  return `
export const ${fileName} = ({ className }${typescript ? `:${fileName}Props` : ''}) => {
  return (${returnJsx({ styleFile, fileName, styleModule, classnames })}
  );
};`
}


const  jsxTemplate = ({ fileName, styleExt, styleModule, typescript, styleFile, classnames, memo }) =>
`${memo ? `import { memo } from 'react';\n` : ''}${classnames ? `import cn from 'classnames';\n`: ''}${styleFile ? `import ${styleModule ? "styles from": ""} './${fileName}${styleModule ? ".module": ""}${styleExt}';` : ''}
${typescript ? `
interface ${fileName}Props {
  className?: string;
}
` : ''}${componentInitialization({ fileName, styleModule, typescript, styleFile, classnames, memo })}
`
module.exports = {jsxTemplate}
