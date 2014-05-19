/**
 * Compliant CommentShape Polyfill For BiliScriptEngine
 */
class CommentField extends TextField implements IComment{
	private _mM:MotionManager = new MotionManager(this);

	constructor(params:Object) {
		this.initStyle(params);
	}

	get motionManager():MotionManager {
		return _mM;
	}

	set motionManager(m):void {
		__trace("IComment.motionManager is read-only", "warn");
	}

	public remove():void {
		this.unload();
	}

	public initStyle(style:Object):void {

	}
}