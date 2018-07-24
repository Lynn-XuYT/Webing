import flask,os,time
from flask import request,send_from_directory,jsonify
from flask_cors import CORS

app = flask.Flask(__name__)

CORS(app, resources=r'/*')

@app.route('/get_fileListContents',methods=['get'])
def  get_fileListContents():

	filename = request.values.get('fname',None) #"1520411895"

	if filename : 

		if os.path.isdir(filename):
			result = []
			for maindir, subdir, file_name_list in os.walk('./'+filename):
					for filenametemp in file_name_list:
						nameext = os.path.splitext(filenametemp)[1]
						if nameext == '.jpg' or nameext == '.gif' or nameext == '.jpeg':
							apath = os.path.join(os.getcwd(), filename +'/'+filenametemp)
							newpath = 'file://' + apath;
							result.append(newpath)

						# apath = os.path.join(os.getcwd(), filename +'/'+filenametemp)
						# newpath = 'file://' + apath;
						# result.append(newpath)
			return jsonify([{"msg":result}])
		else:
			return jsonify({"msg":"file is not exsit"})
	else:
		return jsonify({"msg":"file is null"})


@app.route('/get_file',methods=['get'])
def  get_file():

	filename = request.values.get('fname',None) #"1520411895"

	if filename : 

		if os.path.isfile(filename):

			return jsonify({"msg":"filename","msg":send_from_directory('.',filename,as_attachment=True)}) 
		else:
			return jsonify({"msg":"file is not exsit"})
	else:
		return jsonify({"msg":"file is null"})

@app.route('/helloword',methods=['post'])
def  helloword():
	return jsonify({"msg":"helloword"})

#def allowed_file(filename):    
	#return '.' in filename and filename.rsplit('.',1)[1] in ALLOWED_EXTENSIONS
@app.route('/upload',methods=['post'])
def  upload():
	f=request.files['myfile']
	if f:        
		fname = f.filename  
		print(fname)
		unix_time = int(time.time())
		if len(fname.rsplit('.',1)) > 1:
			ext = fname.rsplit('.',1)[1]
			new_filename=str(unix_time)+'.'+ext
		else:
			new_filename=str(unix_time)
		f.save(os.path.join('.',new_filename))#f.save(os.path.join('.',"newfilename"))
		return jsonify({"msg":'ok'})
	else:
		return jsonify({"msg":'ERROR'})


@app.route('/get_fileList',methods=['get'])
def  get_fileList():
	result = []
	for maindir, subdir, file_name_list in os.walk('.'):
		for filename in file_name_list:
			apath = os.path.join(maindir, filename)
			result.append(apath)
	return jsonify({"msg":result})


app.run(host='10.73.27.38',debug=True, port=8888)
#app.run(host='10.73.154.110',debug=True, port=8888)
