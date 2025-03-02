Metacello new
  baseline: 'Teapot';
  repository: 'github://zeroflag/teapot:master/source';
  load.

Metacello new 
	repository: 'github://astares/Tealight/repository';
	baseline: 'Tealight';
	load.
	
Metacello new
  repository: 'github://pharo-rdbms/Pharo-SQLite3/src';
  baseline: 'SQLite3';
  load.

Metacello new
  repository: 'github://svenvc/NeoJSON/repository';
  baseline: 'NeoJSON';
  load.