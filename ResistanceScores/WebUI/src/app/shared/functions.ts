import { ElementRef } from "@angular/core";

/**
 * Copy all classes and styles on the DOM element to "classes" and "styles" properties on the component
 * @param element
 * an Angular component with an "elRef" property (type:ElementRef) and a "classes" property (type:string).
 */
export function copyClassesAndStyles<T extends { elRef: ElementRef, classes: string, styles: string }>(element: T): void {
  const classStr = 'class';
  const styleStr = 'style';

  element.classes = (element.elRef.nativeElement as HTMLElement).getAttribute(classStr);
  element.styles = (element.elRef.nativeElement as HTMLElement).getAttribute(styleStr);

  const observer = new MutationObserver(mutations => {
    mutations
      .forEach(_ => {
        element.classes = (element.elRef.nativeElement as HTMLElement).getAttribute(classStr);
        const stylesAsString = (element.elRef.nativeElement as HTMLElement).getAttribute(styleStr);
        console.log(`{${stylesAsString}}`);
        element.styles = JSON.parse(`{${stylesAsString}}`);
        console.log(element.styles);
      });
  });
  const config = {
    attributes: true,
    childList: false,
    characterData: false,
    attributeFilter: [classStr, styleStr]
  };

  observer.observe(element.elRef.nativeElement, config);
}

export function isNullOrUndefined(value: any) {
  if (value === null || value === undefined) {
    return true;
  }
  return false;
}

export function arraySum(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  return values.reduce((total, num) => total + num)
}

///**
// * Copy all styles on the DOM element to a "classes" property on the component
// * @param element
// * an Angular component with an "elRef" property (type:ElementRef) and a "classes" property (type:string).
// */
//export function copyStyles<T extends { elRef: ElementRef, styles: string }>(element: T): void {
//  element.classes = element.elRef.nativeElement.classList.value;
//  const observer = new MutationObserver(mutations => {
//    mutations
//      .forEach(mutation => {
//        console.log(mutation.target, mutation.addedNodes, mutation.attributeName, mutation.attributeNamespace);
//        element.classes = (mutation.target as HTMLElement).sty.classList.value;
//      });
//  });
//  const config = { attributes: true, childList: false, characterData: false, attributeFilter: ['class'] };

//  observer.observe(element.elRef.nativeElement, config);
//}

