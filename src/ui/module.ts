import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { IndexComponent } from "./components/index/IndexComponent";
import { NavigationBarComponent } from "./components/navigation/NavigationBarComponent";
import { CommentBoxComponent } from "./components/comment/box/CommentBoxComponent";
import { CommentMessageComponent } from "./components/comment/message/CommentMessageComponent";

@NgModule({
	imports: [BrowserModule],
	declarations: [
		IndexComponent,
		NavigationBarComponent,
		CommentBoxComponent,
		CommentMessageComponent,
	],
	bootstrap: [IndexComponent]
})

class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);