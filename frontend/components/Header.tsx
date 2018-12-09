import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart = () => {
	NProgress.start();
};

Router.onRouteChangeComplete = () => {
	NProgress.done();
};

Router.onRouteChangeError = () => {
	NProgress.done();
};

export const Header = () => (
	<div>
		<h1>Mecasdfasdfhmarket</h1>
	</div>
);
