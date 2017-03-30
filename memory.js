if (!Memory.allocationSegment)
	Memory.allocationSegment = {};
if (!Memory.allocationTable)
	Memory.allocationTable = [
		{u: 0, d: {}},
		{u: 0, d: {}},
		{u: 0, d: {}},
		{u: 0, d: {}},
		{u: 0, d: {}},
		{u: 0, d: {}},
		{u: 0, d: {}},
		{u: 0, d: {}},
		{u: 0, d: {}},
		{u: 0, d: {}}
	];
var cache = {};

function findFree(size) {
	for (var segi = 0; segi <= 9; segi++) {
		var alloc = Memory.allocationTable[segi];
		if (100000 - alloc.u >= size)
			return segi;
	}
	return undefined;
}

function _replace(segi, alloc, data) {
	console.log("_replace");
	RawMemory.segments[segi] =
		RawMemory.segments[segi].substr(0, alloc.p) +
		data +
		RawMemory.segments[segi].substr(alloc.p + alloc.s);
	return true;
}

 function _malloc(segi, name, data, compress) {
		console.log("_malloc");
		segi = findFree(data.length);
		if (segi === undefined)
			return false;
		Memory.allocationSegment[name] = segi;
		Memory.allocationTable[segi].d[name] = {
			p: Memory.allocationTable[segi].u,
			s: data.length,
			c: (compress ? 1 : 0)
		};
		Memory.allocationTable[segi].u += data.length;
		RawMemory.segments[segi] += data;
		return true;
 }

function _free(segi, name, alloc) {
	console.log("_free");
	Memory.allocationTable[segi].u -= alloc.s;
	delete Memory.allocationTable[segi].d[name];
	RawMemory.segments[segi] =
		RawMemory.segments[segi].substr(0, alloc.p) +
		RawMemory.segments[segi].substr(alloc.p + alloc.s);
	var allocs = Memory.allocationTable[segi];
	console.log(JSON.stringify(allocs));
	for (var allocName in allocs.d) {
		if (!allocName)
			continue;
		var a = allocs.d[allocName];
		if (a.p < alloc.p)
			continue;
		a.p -= alloc.s;
	}
	Memory.allocationTable[segi] = allocs;
	return true;
}

function serialize(object, compress) {
	return JSON.stringify(object);
}

function deserialize(data, compress) {
	console.log(data);
	return JSON.parse(data);
}

function save(name, object, compress) {
	var data = serialize(object),
		alloc, segi;
	if (!Memory.allocationSegment)
		Memory.allocationSegment = {};

	cache[name] = object;

	segi = Memory.allocationSegment[name];
	if (segi !== undefined)
		alloc = Memory.allocationTable[segi].d[name];
	if (segi !== undefined && alloc) {
		if (alloc.s === data.length) {
			Memory.allocationTable[segi].d[name].c = compress ? 1 : 0;
			return _replace(segi, alloc, data, compress);
		} else {
			return _free(segi, name, alloc) && _malloc(segi, name, data, compress);
		}
	} else {
		return _malloc(segi, name, data, compress);
	}
}

function remove(name) {
	var segi = Memory.allocationSegment[name];
	if (segi === undefined)
		return true;
	var alloc = Memory.allocationTable[segi].d[name];
	if (!alloc)
		return true;
	delete cache[name];
	return _free(segi, name, alloc);
}

function load(name) {
	if (cache[name])
		return cache[name];
	var segi = Memory.allocationSegment[name];
	if (segi === undefined)
		return undefined;
	var alloc = Memory.allocationTable[segi].d[name];
	if (!alloc)
		return undefined;
	console.log(JSON.stringify(alloc));
	return deserialize(RawMemory.segments[segi].substr(alloc.p, alloc.s), alloc.c);
}

module.exports = {
	save: save,
	load: load,
	remove: remove
};