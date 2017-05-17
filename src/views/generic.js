export default function({template, controller}) {
	return function(ctx, next) {
		console.log('haha');
		const DOM = template();
		new controller(DOM);
	}
}