const url = './docs/pdf.pdf';

let pdfDoc = null, pageNum = 1, pageIsRendering = false, pageNumIsPending = null;
const scale = 1.5;
const canvas = document.querySelector('#pdf-render');
const ctx = canvas.getContext('2d');

// render the page
const renderPage = num => {
    pageIsRendering = true;

    //get the page
    pdfDoc.getPage(num).then(page => {
        //set the scale
        const viewport = page.getViewport( {
            scale
        });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderCtx = {
            canvasContext: ctx,
            viewport
        }
        page.render(renderCtx).promise.then(() => {
            pageIsRendering = false;
            
            if(pageNumIsPending !== null) {
                renderPage(pageNumIsPending);
                pageNumIsPending = null;
            }
        });
        //output current page
        document.querySelector('#page-num').textContent = num;
    });
};

//check for pages rendering
const queueRenderPage = num => {
    if(pageIsRendering) {
        pageNumIsPending = num;
    } else {
        renderPage(num);
    }
}

//show Prev page
const showPrevPage = () => {
    if(pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
}

//show Next page
const showNextPage = () => {
    if(pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
}

//get the document
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    console.log(pdfDoc_);
    document.querySelector('#page-count').textContent = pdfDoc.numPages;
    renderPage(pageNum);
})
    .catch(error => {
        //Display error
        const section = document.createElement('section');
        section.className = 'error';
        section.appendChild(document.createTextNode(error.message));
        document.querySelector('body').insertBefore(section, canvas);
        //Remove top bar
        document.querySelector('.top-bar').style.display = 'none';
    })

//button events
document.querySelector('#prev-page').addEventListener('click', showPrevPage);
document.querySelector('#next-page').addEventListener('click', showNextPage);