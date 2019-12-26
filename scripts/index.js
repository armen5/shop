const products = [
    { ID:1, title: 'Շարֆ', quantity: 1, price: 1250 },
    { ID:2, title: 'Գլխարկ', quantity: 10, price: 1000 },
    { ID:3, title: 'Վերարկու', quantity: 5, price: 12000 },
    { ID:4, title: 'Պայուսակ', quantity: 7, price: 4500 },
    { ID:5, title: 'Տաբատ', quantity: 0, price: 7000 },
    { ID:6, title: 'Տաբատ', quantity: 3, price: 4000 },
];

$(document).ready(function(){
    products.forEach((item, index) => {
        var totalPrice = $('.total').html()
        $('.products').append(`
            <div class="product pr_${item.ID}" data-id="${item.ID}">
                <div class="product_title">
                    <p>${item.title}</p>
                    <p>ID:${item.ID}</p>
                </div>
                <p>Description...</p>
                <div class="">
                    <div class="price_parent">
                        <p><span>${item.price}</span><span> AMD</span></p>
                        <p>${item.quantity}</p>
                    </div>
                </div>
            </div>
        `)

        $('tbody').append(`
            <tr class="tr_${item.ID}">
                <td>${item.ID}</td>
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>
                    <div class="number">
                        <span class="minus">-</span>
                        <input  data-id="${item.ID}" min="0" step="1" value="1"/>
                        <span class="plus">+</span>
                    </div>
                </td>
            </tr>
        `)
        console.log(totalPrice)
        $('.total').html(Number(totalPrice) + Number(item.price))
    })

                // <button class="btn btn-success add_to_cart" ${item.quantity == 0 && 'disabled'}>Add To Cart</button>
    
    // $(document).on('click','.add_to_cart',function(e){
    //     var _this = $(this)
    //     var _ID = _this.parents('.product').attr('data-id')
    //     var _title = _this.parents('.product').find('.product_title').find('p').first().html()
    //     var _price = _this.parents('.product').find('.price_parent').find('p').first().find('span').first().html()
    //     var _quantity = _this.parents('.product').find('.price_parent').find('p').last().html()
    //     var _total = $('.total').html()

    //     console.log(_price)
    //     if (_this.hasClass('already')) {
    //         if (_quantity != 0) {
    //             $('.total').html(Number(_total) + Number(_price))
    //             var alreadyPrice = $('tbody').find(`.tr_${_ID}`).find('td:nth-child(3)').html()
    //             var _count = $('tbody').find(`.tr_${_ID}`).find('td:nth-child(4)').find('input').val()
    //             $('tbody').find(`.tr_${_ID}`).find('td:nth-child(4)').find('input').val(++_count)
    //             $('tbody').find(`.tr_${_ID}`).find('td:nth-child(3)').html(Number(alreadyPrice) + Number(_price))

    //             var parent_count = _this.parents('.product').find('.price_parent').find('p').last().html(--_quantity)
    //         }
    //         if (_quantity == 0) {
    //             _this.attr('disabled', true)
    //         }
    //     }else{
    //         $('.total').html(Number(_total) + Number(_price))
    //         _this.addClass('already')
    //         _this.parents('.product').find('.price_parent').find('p').last().html(--_quantity)
    //         console.log(_ID,_title,_price,_quantity)

    //         $('tbody').append(`
    //             <tr class="tr_${_ID}">
    //                 <td>${_ID}</td>
    //                 <td>${_title}</td>
    //                 <td>${_price}</td>
    //                 <td>
    //                     <div class="number">
    //                         <span class="minus">-</span>
    //                         <input type="text" value="1"/>
    //                         <span class="plus">+</span>
    //                     </div>
    //                 </td>
    //                 <td>
    //                     <button class="btn btn-danger delete_cart del_${_ID}" data-id="${_ID}">X</button>
    //                 </td>
    //             </tr>
    //         `)
    //     }
                    
    // })


    $(document).on('click', '.minus', function () {
        var _this = $(this)
        var _ID = _this.parents('tr').find('td').first().html()
        var _cart_count = _this.parents('tr').find('td:nth-child(4)').find('input').val()
        var _product_count = $('.pr_'+_ID).find('.price_parent').find('p').last().html()
        var _price = $('.pr_'+_ID).find('.price_parent').find('p').first().find('span').first().html()
        var _total = $('.total').html()

        if (_product_count == 0) {
            $('.pr_'+_ID).find('.add_to_cart').removeAttr('disabled')
        }

        if(_cart_count == 0){
            return false
            // $('.tr_'+_ID).remove()
            // $('.pr_'+_ID).find('.add_to_cart').removeClass('already')
        }
        console.log(_cart_count)
        $('.total').html(Number(_total) - Number(_price))
        var alreadyPrice = $('tbody').find(`.tr_${_ID}`).find('td:nth-child(3)').html()
        $('tbody').find(`.tr_${_ID}`).find('td:nth-child(3)').html(Number(alreadyPrice) - Number(_price))
        _this.parents('tr').find('td:nth-child(4)').find('input').val(--_cart_count)
        $('.pr_'+_ID).find('.price_parent').find('p').last().html(++_product_count)

        var $input = $(this).parent().find('input');
        // var count = parseInt($input.val()) - 1;
        // count = count < 1 ? 1 : count;
        // $input.val(count);
        $input.change();
        return false;
    });

    $(document).on('click', '.plus', function () {
        var _this = $(this)
        var _ID = _this.parents('tr').find('td').first().html()
        var _cart_count = _this.parents('tr').find('td:nth-child(4)').find('input').val()
        var _price = $('.pr_'+_ID).find('.price_parent').find('p').first().find('span').first().html()
        var _product_count = $('.pr_'+_ID).find('.price_parent').find('p').last().html()
        var _total = $('.total').html()
        if(_product_count == 1){
            $('.pr_'+_ID).find('.add_to_cart').attr('disabled', true)
        }
        if (_product_count != 0) {
            $('.total').html(Number(_total) + Number(_price))
            var alreadyPrice = $('tbody').find(`.tr_${_ID}`).find('td:nth-child(3)').html()
            $('tbody').find(`.tr_${_ID}`).find('td:nth-child(3)').html(Number(alreadyPrice) + Number(_price))
            _this.parents('tr').find('td:nth-child(4)').find('input').val(++_cart_count)
            $('.pr_'+_ID).find('.price_parent').find('p').last().html(--_product_count)
    
            var $input = $(this).parent().find('input');
            // $input.val(parseInt($input.val()) + 1);
            $input.change();
            return false;
        }
        
    });

    $(document).on('click','.delete_cart',function(e){
        var _this = $(this)
        var _ID = _this.attr('data-id')
        var _cart_count = _this.parents('tr').find('td:nth-child(4)').find('input').val()
        var _product_count = $('.pr_'+_ID).find('.price_parent').find('p').last().html()
        var _price = $('.pr_'+_ID).find('.price_parent').find('p').first().find('span').first().html()
        var _total = $('.total').html()
        $('.total').html(_total - (_price *  Number(_cart_count)))
        $('.pr_'+_ID).find('.price_parent').find('p').last().html(Number(_product_count) + Number(_cart_count))
        $('.tr_'+_ID).remove()
        $('.pr_'+_ID).find('.add_to_cart').removeClass('already').removeAttr('disabled')
    })

}) 