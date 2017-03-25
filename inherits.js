module.exports = function (Child, Parent) {
	Child.prototype = Object.create(Parent.prototype);
	Child.prototype._super = Parent;
	Child.prototype.constructor = Child;
};
