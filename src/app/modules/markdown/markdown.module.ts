import { NgModule } from '@angular/core';
import { Tokenizer, marked } from 'marked';
import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';



export function markedOptionsFactory(): MarkedOptions {
  // const renderer = new MarkedRenderer();
  const renderer = new marked.Renderer();
  const lexer = new marked.Lexer();

  // renderer.blockquote = (text: string) => {
  //   return '<blockquote><h2>' + text + '</h2></blockquote>';
  // };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
    // tokenizer: new MyTokenizer(),
  };
}


@NgModule({
  imports: [
    
  ],
  exports: [
  ]
})
export class MarkdownModule { }
