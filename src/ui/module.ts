import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { IndexPageComponent } from "./pages/index/IndexPageComponent";
import { BlogPageComponent } from "./pages/blog/BlogPageComponent";
import { NavigationBarComponent } from "./components/navigation/NavigationBarComponent";
import { BlogListComponent } from "./components/blog/list/BlogListComponent";
import { BlogSearchComponent } from "./components/blog/search/BlogSearchComponent";
import { BlogContentComponent } from "./components/blog/content/BlogContentComponent";
import { ProfileSummaryComponent } from "./components/profile/summary/ProfileSummaryComponent";
import { FooterComponent } from "./components/footer/FooterComponent";
import { CommentBoxComponent } from "./components/comment/box/CommentBoxComponent";
import { CommentMessageComponent } from "./components/comment/message/CommentMessageComponent";

@NgModule({
	imports: [BrowserModule],
	declarations: [
		IndexPageComponent,
		BlogPageComponent,
		NavigationBarComponent,
		BlogListComponent,
		BlogSearchComponent,
		BlogContentComponent,
		ProfileSummaryComponent,
		CommentBoxComponent,
		CommentMessageComponent,
		FooterComponent
	],
	bootstrap: [IndexPageComponent]
})

class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);