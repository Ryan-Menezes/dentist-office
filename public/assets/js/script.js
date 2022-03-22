window.addEventListener('load', function(e){
    const btnCancel = window.document.querySelector('.btn-cancel')
    const modais = window.document.querySelectorAll('.modal')
    const btnDeletes = window.document.querySelectorAll('[data-delete]')

    btnCancel.addEventListener('click', function(e){
        e.preventDefault()

        modais.forEach((modal) => modal.style.display = 'none')
    })

    btnDeletes.forEach((btnDelete) => {
        btnDelete.addEventListener('click', function(e){
            e.preventDefault()

            const btn = window.document.querySelector('.btn-delete')
            const modal = window.document.querySelector('.modal-delete')
            
            btn.href = this.dataset.delete
            modal.style.display = 'flex'
        })
    })
})