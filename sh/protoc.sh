for file in ../src/protos/*.proto
do
/Users/cheney/tool/protoc-3.6.1-osx-x86_64/bin/protoc                           \
--plugin=/Users/cheney/tool/protoc-3.6.1-osx-x86_64/bin/protoc-gen-grpc-web     \
-I=../src/protos $file --js_out=import_style=commonjs:../web/grpc                 \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:../web/grpc
done
