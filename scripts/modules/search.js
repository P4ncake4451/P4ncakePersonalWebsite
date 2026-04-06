function searchByTags(tags, prompt, omit){
    let tagsWithOmit = {};
    Object.keys(tags).forEach(key => {
        tagsWithOmit[key] = tags[key].concat(omit);
    });
    let results = Object.keys(tags);
    const search_prompt = prompt.split(/[\s,]+/);
    let removeresult = false

    search_prompt.forEach(word => {
        [...results].forEach(tag => {
            removeresult = true;
            tagsWithOmit[tag].forEach(keyword => {
                if(keyword.includes(word)) {
                    removeresult=false;
                    return;
                }
            });
            if(removeresult){
                const index = results.indexOf(tag);
                if (index > -1) {
                    results.splice(index, 1);
                }   
            }
        });
    });
    return results;
}

export default searchByTags;