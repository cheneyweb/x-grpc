for package in ../src/protos/*
do
    for file in $package/*.proto
    do
        /Users/cheney/tool/protoc-3.6.1-osx-x86_64/bin/protoc                           \
        --plugin=/Users/cheney/tool/protoc-3.6.1-osx-x86_64/bin/protoc-gen-grpc-web     \
        -I=$package $file --js_out=import_style=commonjs:$package                       \
        --grpc-web_out=import_style=commonjs,mode=grpcwebtext:$package
    done
done
