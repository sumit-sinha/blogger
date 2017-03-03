import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { IndexPageComponent } from "./pages/index/IndexPageComponent";
import { BlogPageComponent } from "./pages/blog/display/BlogPageComponent";
import { BlogEditPageComponent } from "./pages/blog/edit/BlogEditPageComponent";
import { ProfilePageComponent } from "./pages/profile/ProfilePageComponent";
import { NavigationBarComponent } from "./components/navigation/NavigationBarComponent";
import { BlogListComponent } from "./components/blog/list/BlogListComponent";
import { BlogSearchComponent } from "./components/blog/search/BlogSearchComponent";
import { BlogContentComponent } from "./components/blog/content/BlogContentComponent";
import { BlogEditorComponent } from "./components/blog/editor/BlogEditorComponent";
import { ProfileSummaryComponent } from "./components/profile/summary/ProfileSummaryComponent";
import { ProfileLoginComponent } from "./components/profile/login/ProfileLoginComponent";
import { CommentBoxComponent } from "./components/comment/box/CommentBoxComponent";
import { CommentMessageComponent } from "./components/comment/message/CommentMessageComponent";
import { InputBoxComponent } from "./components/form/InputBoxComponent";
import { CheckboxComponent } from "./components/form/CheckboxComponent";
import { LoadingButtonComponent } from "./components/form/LoadingButtonComponent";
import { AlertMessageComponent } from "./components/message/AlertMessageComponent";

import { ReverseArrayPipe } from "./pipes/array/ReverseArrayPipe";
import { NetworkRequestHelper } from "./helpers/network/NetworkRequestHelper";
import { ValidationHelper } from "./helpers/validation/ValidationHelper";

@NgModule({
	imports: [
		HttpModule,
		BrowserModule,
		RouterModule.forRoot([{
			path: "",
			component: ProfilePageComponent
		}, {
			path: ":blog",
			component: BlogPageComponent
		}, {
			path: ":blog/edit",
			component: BlogEditPageComponent
		}, {
			path: "new/blog",
			component: BlogEditPageComponent
		}, {
			path: "profile/login",
			component: ProfileLoginComponent
		}])
	],
	declarations: [
		IndexPageComponent,
		BlogPageComponent,
		BlogEditPageComponent,
		ProfilePageComponent,
		NavigationBarComponent,
		BlogListComponent,
		BlogSearchComponent,
		BlogContentComponent,
		BlogEditorComponent,
		ProfileSummaryComponent,
		ProfileLoginComponent,
		CommentBoxComponent,
		CommentMessageComponent,
		InputBoxComponent,
		CheckboxComponent,
		LoadingButtonComponent,
		AlertMessageComponent,
		
		ReverseArrayPipe
	],
	providers: [
		{provide: APP_BASE_HREF, useValue : '/' }, 
		NetworkRequestHelper,
		ValidationHelper
	],
	bootstrap: [IndexPageComponent]
})

class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);