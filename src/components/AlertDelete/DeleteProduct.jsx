import './deleteProduct.css'


const DeleteProduct = ({handleDeleteOk, handleDeleteNo}) => {

  

  return (
    <section className='delete__product-container'>
        <article className='delete__product-main'>
            <p className='delete__product-title'>Remove Product</p>
            <p className='delete__product-text'>You want to delete this product</p>

            <article className='delete__product-button'>
                <button onClick={handleDeleteOk}><i className='bx bx-like' ></i></button>
                <button onClick={handleDeleteNo}><i className='bx bx-dislike' ></i></button>
            </article>
        </article>
    </section>
  )
}

export default DeleteProduct