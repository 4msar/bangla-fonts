function arrayChunk(inputArray, chunk = 3) {
    if (!Array.isArray(inputArray)) {
        return [inputArray];
    }
    if (chunk < 0) {
        throw new Error('Invalid chunk size!');
    }
    return inputArray.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunk);

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
    }, []);
}

window.onload = function() {
    let data = [];
    fetch("/index.json")
        .then(response => response.json())
        .then(json => {
            data = arrayChunk(json, 3).map(chunk => {
                const colors = ['cyan', 'red', 'blue'];
                return chunk.map((item, index)=>{
                    return `<a href="/${item.path}" class="box ${index !== 1 ? 'box-down' : ''} ${colors[index]}">
                                <h2>${item.name}</h2>
                                <p>${item.description}</p>
                                <p class="author">${item.author.join(', ')}</p>
                                <img src="${item.icon ?? '/assets/supervisor.svg'}" alt="icon">
                            </a>`
                }).join('');
            }).join('');
            document.getElementById("content").innerHTML = data;
        });
};