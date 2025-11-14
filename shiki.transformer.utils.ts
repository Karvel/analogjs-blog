/**
 * Thanks to Evann Bacala for the inspiration for this:
 * https://ebacala.com/blog/create-a-code-block-with-a-copy-button-using-astro-markdown-and-shiki/
 */

import { h } from 'hastscript';

export const transformerMeta = (): any => ({
  name: 'transformer-meta',
  pre() {
    const metaRaw = this.options.meta?.__raw;
    let meta: any = {};
    if (metaRaw) {
      const parts = metaRaw.split(/\s+/);
      for (const part of parts) {
        const [key, value] = part.split('=');
        if (key && value) {
          meta[key] = value;
        }
      }
    }
    this.meta = meta;
  },
});

/**
 * This transformer is used to add a header to the code blocks.
 */
export const transformerCreateCodeBlockHeader = (): any => ({
  name: 'transformer-create-code-block-header',
  pre(node: any) {
    const preHeaderDiv = h('div', {
      class: 'pre-header',
    });

    node.children.unshift(preHeaderDiv);
  },
});

export const transformerCopyButton = (): any => ({
  name: 'transformer-color-lines',
  pre(node: any) {
    if (this.meta.copy) {
      const preHeaderDiv = node.children[0];

      const copyCodeButton = h(
        'div',
        {
          class: 'wrapper-copy-code',
        },
        h(
          'button',
          {
            class: 'copy-code',
            'data-code': this.source,
            onclick: `
                navigator.clipboard.writeText(this.dataset.code);
                this.textContent = 'Copied!';
                setTimeout(() => this.textContent = 'Copy', 1000)
            `,
          },
          'Copy',
        ),
      );

      preHeaderDiv.children.push(copyCodeButton);
    }
  },
});
