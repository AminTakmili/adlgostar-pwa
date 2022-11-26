import { Inject, Injectable, RendererFactory2, Renderer2 } from '@angular/core';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import { GlobalService } from './global.service';
import { DOCUMENT } from '@angular/common';
// import { Location, LocationStrategy } from '@angular/common';


import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    private renderer: Renderer2;

    fullUrl: string;
    baseUrl: string;
    constructor(
        private titleService: Title,
        private metaService: Meta,
        public global: GlobalService,
        private rendererFactory: RendererFactory2,
        // private location: Location,
        // private locationStrategy: LocationStrategy,
        // private router: Router,

        // @Inject(DOCUMENT) private _document,
    ) {
        this.renderer = this.rendererFactory.createRenderer(null, null);

        // console.log(this.location.prepareExternalUrl('amin')) ;
        // this.baseUrl = this.locationStrategy['_platformLocation']['location']['protocol'] +"//"+this.locationStrategy['_platformLocation']['location']['host'];
        //  this.fullUrl = this.global.siteUrl +'/'+ decodeURI(this.router.routerState.snapshot.url.substr(1));
    }

    generateTags(config : any) {

        // const fullUrl = this.global.siteUrl + '/' + decodeURI(this.router.routerState.snapshot.url.substr(1));
        this.titleService.setTitle(config.title + ' | ' + this.global.sitename);
        this.metaService.updateTag({ name: 'description', content: config.description });
        this.metaService.updateTag({ name: 'abstract', content: config.description });

        this.metaService.updateTag({ name: 'keywords', content: config.keywords });
        this.metaService.updateTag({ name: 'robots', content: (!config.noIndex ? 'index,follow' : 'noindex,nofollow') });
        this.metaService.updateTag({ name: 'author', content: 'emad faghihi' });
        // Twitter
        // this.metaService.updateTag({ property: 'twitter:card', content: 'summary' });
        // this.metaService.updateTag({ property: 'twitter:site', content: this.global.sitenametw });
        // this.metaService.updateTag({ property: 'twitter:title', content: config.title });
        // this.metaService.updateTag({ property: 'twitter:description', content: config.description });
        // this.metaService.updateTag({ property: 'twitter:image', content: config.image });
        // // Facebook
        // this.metaService.updateTag({ property: 'og:type', content: 'website' });
        // this.metaService.updateTag({ property: 'og:site_name', content: this.global.sitename });
        // this.metaService.updateTag({ property: 'og:url', content: (config.url !== undefined ? config.url : fullUrl) });
        // this.metaService.updateTag({ property: 'og:title', content: config.title });
        // this.metaService.updateTag({ property: 'og:description', content: config.description });
        // this.metaService.updateTag({ property: 'og:image', content: config.image });


    }

}

