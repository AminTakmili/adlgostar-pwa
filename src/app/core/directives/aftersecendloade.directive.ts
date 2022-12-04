import { isPlatformBrowser, } from "@angular/common";
import { Directive, HostListener, Input, TemplateRef, ViewContainerRef } from "@angular/core";
// import { LoadingService } from "../services/loading.service";

@Directive({
  selector: '[appAftersecendloade]'
})
export class AftersecendloadeDirective {
  @Input('isStart') isStart:boolean
  // @HostListener('scrool') refreshTag(){}
  constructor(
    private templateRef:TemplateRef<any>,
    private viewContainer : ViewContainerRef,
    // private loadingService : LoadingService

    ){
        // console.log(isPlatformBrowser(this.platformId));

        // console.log(this.loadingService);
        // console.log(this.templateRef);
        // console.log(this.viewContainer);
        // console.log(this.viewContainer.element.nativeElement);
        // console.log(isPlatformBrowser(this.platformId));
}

ngOnInit(){
  this.viewContainer.createEmbeddedView(this.templateRef);

  setInterval(() => {
    
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
    // console.clear()
  }, 1000);
  // console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
  // this.viewContainer.clear();
  // setTimeout(() => {
  //       this.viewContainer.createEmbeddedView(this.templateRef);

  // }, 1000);
  
  
    
    // if(isPlatformBrowser(this.platformId)){
    //     this.viewContainer.createEmbeddedView(this.templateRef);
    // }
    // else{
    //     this.viewContainer.clear();
    //     // this.loadingService.containerLoading.subscribe((x)=>{
    //     //     if(x){
    //     //         this.viewContainer.createEmbeddedView(this.templateRef);
    //     //     }else{
    //     //         this.viewContainer.clear();
    //     //     }
    //     // });
    // }

}

}
