import { BaseCommand } from '@alexi/management/base';

export class Command extends BaseCommand {
  help = 'Builds the project.';

  async execute() {
    const elementNames = [
      ['HTMLAnchorElement', 'a', 'Anchor'],
      ['HTMLAreaElement', 'area', 'Area'],
      ['HTMLAudioElement', 'audio', 'Audio'],
      ['HTMLBRElement', 'br', 'BR'],
      ['HTMLBaseElement', 'base', 'Base'],
      ['HTMLBodyElement', 'body', 'Body'],
      ['HTMLElement', 'b', 'Bold'],
      ['HTMLButtonElement', 'button', 'Button'],
      ['HTMLCanvasElement', 'canvas', 'Canvas'],
      ['HTMLDListElement', 'dl', 'DList'],
      ['HTMLDataElement', 'data', 'Data'],
      ['HTMLDataListElement', 'datalist', 'DataList'],
      ['HTMLElement', 'dd', 'DDetails'],
      ['HTMLDialogElement', 'dialog', 'Dialog'],
      ['HTMLDivElement', 'div', 'Div'],
      ['HTMLElement', 'dt', 'DTerm'],
      ['HTMLEmbedElement', 'embed', 'Embed'],
      ['HTMLFieldSetElement', 'fieldset', 'FieldSet'],
      ['HTMLFormElement', 'form', 'Form'],
      ['HTMLFrameSetElement', 'frameset', 'FrameSet'], // deprecated
      ['HTMLHRElement', 'hr', 'HR'],
      ['HTMLHeadElement', 'head', 'Head'],
      ['HTMLHeadingElement', 'h1', 'Heading1'],
      ['HTMLHeadingElement', 'h2', 'Heading2'],
      ['HTMLHeadingElement', 'h3', 'Heading3'],
      ['HTMLHeadingElement', 'h4', 'Heading4'],
      ['HTMLHeadingElement', 'h5', 'Heading5'],
      ['HTMLHeadingElement', 'h6', 'Heading6'],
      ['HTMLHtmlElement', 'html', 'Html'],
      ['HTMLIFrameElement', 'iframe', 'IFrame'],
      ['HTMLImageElement', 'img', 'Image'],
      ['HTMLInputElement', 'input', 'Input'],
      ['HTMLLIElement', 'li', 'LI'],
      ['HTMLLabelElement', 'label', 'Label'],
      ['HTMLLegendElement', 'legend', 'Legend'],
      ['HTMLLinkElement', 'link', 'Link'],
      ['HTMLMapElement', 'map', 'Map'],
      ['HTMLMediaElement', 'media', 'Media'],
      ['HTMLMetaElement', 'meta', 'Meta'],
      ['HTMLMeterElement', 'meter', 'Meter'],
      ['HTMLModElement', 'mod', 'Mod'],
      ['HTMLElement', 'nav', 'Nav'],
      ['HTMLOListElement', 'ol', 'OList'],
      ['HTMLObjectElement', 'object', 'Object'],
      ['HTMLOptGroupElement', 'optgroup', 'OptGroup'],
      ['HTMLOptionElement', 'option', 'Option'],
      ['HTMLOutputElement', 'output', 'Output'],
      ['HTMLParagraphElement', 'p', 'Paragraph'],
      ['HTMLPictureElement', 'picture', 'Picture'],
      ['HTMLPreElement', 'pre', 'Pre'],
      ['HTMLProgressElement', 'progress', 'Progress'],
      ['HTMLQuoteElement', 'quote', 'Quote'],
      ['HTMLScriptElement', 'script', 'Script'],
      ['HTMLSelectElement', 'select', 'Select'],
      ['HTMLSlotElement', 'slot', 'Slot'],
      ['HTMLSourceElement', 'src', 'Source'],
      ['HTMLSpanElement', 'span', 'Span'],
      ['HTMLStyleElement', 'style', 'Style'],
      ['HTMLTableCaptionElement', 'caption', 'TableCaption'],
      ['HTMLTableCellElement', 'td', 'TableCell'],
      ['HTMLTableColElement', 'col', 'TableCol'],
      ['HTMLTableElement', 'table', 'Table'],
      ['HTMLTableCellElement', 'th', 'TableHead'],
      ['HTMLTableRowElement', 'tr', 'TableRow'],
      ['HTMLTableSectionElement', 'tbody', 'TableSection'],
      ['HTMLTemplateElement', 'template', 'Template'],
      ['HTMLTextAreaElement', 'textarea', 'TextArea'],
      ['HTMLTimeElement', 'time', 'Time'],
      ['HTMLTitleElement', 'title', 'Title'],
      ['HTMLTrackElement', 'track', 'Track'],
      ['HTMLUListElement', 'ul', 'UList'],
      ['HTMLUnknownElement', 'unknown', 'Unknown'],
      ['HTMLVideoElement', 'video', 'Video'],
    ];

    elementNames.forEach(([elementName, tagName, exportName]) => {
      console.info('Writing', elementName);

      const className = exportName + 'Element';

      const template = `import { merge } from '../merge';
    import { RenderObject, IncomingProps } from '../utility_types';
    
    export type ${exportName}Props<T = unknown> = IncomingProps<${elementName}, T>;
    
    export class ${className}<T = unknown> extends ${elementName} {
      static get observedAttributes(): string[] {
        return [];
      }

      static define(name: string) {
        const defined = customElements.get(name) ?? customElements.getName(this);
        if (!defined) {
          customElements.define(name, this, { extends: '${tagName}' });
        }
      }

      static getName() {
        return customElements.getName(this);
      }
    
      static getSelector() {
        return \`${tagName}[is="\${this.getName()}"]\`;
      }
    
      props: Partial<${exportName}Props<T>>;
    
      constructor(props?: Partial<${exportName}Props<T>>) {
        super();
        this.props = props ?? {};
      }
    
      /**
       * Called each time the element is added to the document.
       */
      connectedCallback(): void {
        const {
          children,
          child,
          textContent,
          innerHTML,
          innerText,
          style,
          dataset,
          ...rest
        } = merge(this.getDefaultProps(), this.props);
    
        if (style) {
          Object.assign(this.style, style);
        }
    
        if (dataset) {
          Object.assign(this.dataset, dataset);
        }
    
        Object.assign(this, rest);
    
        this.build();
    
        this.update();
      }
    
      /**
       * Called each time the element is removed from the document.
       */
      disconnectedCallback(): void {}
    
      /**
       * Called each time the element is moved to a new document.
       */
      adoptedCallback(): void {}
    
      /**
       * Called each time any attributes that are listed in the observedAttributes static property are changed, added, removed, or replaced.
       */
      attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string,
      ): void {}
    
      /**
       * Define default props for this component.
       * @returns {Partial<${exportName}Props>} Partial props.
       */
      getDefaultProps(): Partial<${exportName}Props<T>> {
        return {};
      }
    
      /**
       * Implement a child tree for this component.
       * @returns {RenderObject} The rendered object.
       */
      render(): RenderObject {
        return null;
      }
        
      /**
       * Builds a child tree for this element.
       */
      build(): void {
        const { children, child, textContent, innerHTML, innerText } = this.props;
    
        const isHTML = (string: string) => {
          const doc = new DOMParser().parseFromString(string, 'text/html');
          return Array.from(doc.body.childNodes).some(
            (node) => node.nodeType === 1,
          );
        };
    
        const convert = (content: Node | string | null | undefined) => {
          const isNode = content instanceof Node;
          const isString = typeof content === 'string';
          const isNull = content === null;
          const isUndefined = content === undefined;
          const isSomethingElse = !isNode && !isString && !isNull && !isUndefined;
    
          if (isSomethingElse) {
            throw new Error('Invalid render type provided. Must follow RenderObject.');
          }
    
          return content ?? '';
        };
    
        const content =
          this.render() ??
          children ??
          child ??
          textContent ??
          innerHTML ??
          innerText;
    
        if (content instanceof Array) {
          this.replaceChildren(...content.map(convert));
        } else {
          if (typeof content === 'string' && isHTML(content)) {
            this.innerHTML = content;
          } else {
            this.replaceChildren(convert(content));
          }
        }
      }
    
      /**
       * Implement side effects according to current properties state.
       */
      update(): void {}
    }
    
    // Shorthand alias
    export { ${className} as ${exportName} };
    `;
      const encoder = new TextEncoder();
      Deno.writeFileSync(
        `${__dirname}/../../builtin_elements/${tagName.toLowerCase()}.ts`,
        encoder.encode(template),
      );
    });

    const encoder = new TextEncoder();
    Deno.writeFileSync(
      `${__dirname}/../../builtin_elements/index.ts`,
      encoder.encode(
        elementNames
          .map(([, tagName]) => {
            return `export * from './${tagName.toLowerCase()}';`;
          })
          .join('\n'),
      ),
    );

    console.info('Done.');
  }
}
