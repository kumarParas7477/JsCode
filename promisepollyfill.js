function MyPromise(exec){

    let onResolved;
    let onRejected;
    let isCalled = false;
    let isRejected = false;
    let isFullfilled = false;
    let value;
    let error;

    function resolved(val){
        isFullfilled = true;
        value = val;
        if(!isCalled && typeof onResolved == 'function'){
            onResolved(val);
            isCalled = true;
        }

    }

    function rejected(err){
        isRejected = true;
        error = err
        if(!isCalled && typeof onRejected == 'function'){
            onRejected(err);
            isCalled = true;
        }
    }
    this.then=function(thenCb){
      onResolved = thenCb;
      if(!isCalled && isFullfilled){
        onResolved(val);
        isCalled = true;
      }
        return this;
    }
    this.catch=function(catchCb){
        onRejected = catchCb;
        if(!isCalled && isRejected){
            onRejected(error);
            isCalled = true;
          }
        return this;

    }

    exec(resolved,rejected)
}

MyPromise.prototype.all=function(promises){

    return new MyPromise(function executer(resolved,rejected){
      let res=[];
      let count=0;
      if(promises.length == 0){
        resolved(promises);
        return;
      }

      for(let i=0;i<promises.length;i++){
        promises[i].then((res,i)=>{
            document(data,i)
        }).catch(err=> rejected(arr))
      }

      function done(data,index){
        ++count;
        res[index]=data;
        if(count == promises.length){
            resolved(res);
        }

      }
    })
}

MyPromise.prototype.any = function(promises){
    return new MyPromise(function exec(resolved,rejected){
        let count=0;
        let result=[];
        if(promises.length == 0){
            resolved(promises);
            return;
          }

          for(let i=0;i<promises.length;i++){
            promises.then((val)=>{
               resolved(val)
               return;
            }).catch((err)=>{
               handleRej(err,i)
            })
          }

          function handleRej(val,index){
            ++count;
            result[index]=val;
            if(count == promises.length){
                resolved(result);
            }
    
          }
    })
 

}

MyPromise.prototype.race = function(promises){
    return new MyPromise(function exec(resolved,rejected){
        if(promises.length == 0){
            resolved(promises);
            return;
          }

          for(let i=0;i<promises.length;i++){
            promises.then((val)=>{
               resolved(val);
               return
            }).catch((err)=>{
               rejected(err);
               return;
            })
          }
    })
}