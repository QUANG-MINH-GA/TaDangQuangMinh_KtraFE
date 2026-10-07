document.addEventListener('DOMContentLoaded', () => {
    function updateCart() {
        const items = document.querySelectorAll('.item');
        let totalQty = 0;
        let totalPrice = 0;

        items.forEach(item => {
            const checkbox = item.querySelector('.item-check');
            const qtyInput = item.querySelector('.qty-input');
            const priceElement = item.querySelector('.item-price');

            if (checkbox && checkbox.checked) {
                const qty = parseInt(qtyInput.value) || 0;
                const unitPrice = parseFloat(item.getAttribute('data-price'));

                const itemTotal = qty * unitPrice;
                if (priceElement) priceElement.innerText = itemTotal.toFixed(2);

                totalQty += qty;
                totalPrice += itemTotal;
            } else if (checkbox && priceElement && qtyInput) {
                const unitPrice = parseFloat(item.getAttribute('data-price'));
                priceElement.innerText = (parseInt(qtyInput.value) * unitPrice).toFixed(2);
            }
        });

        const cartCountEl = document.getElementById('cart-count');
        if (cartCountEl) cartCountEl.innerText = totalQty;

        document.querySelectorAll('.total-items').forEach(el => {
            el.innerText = totalQty;
        });
        document.querySelectorAll('.subtotal-price').forEach(el => {
            el.innerText = totalPrice.toFixed(2);
        });
    }

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            e.preventDefault();
            const item = e.target.closest('.item');
            if (item) {
                item.remove();
                updateCart();
            }
        }

        const toggleBtn = document.querySelector('.cart-header a');
        if (toggleBtn && e.target === toggleBtn) {
            e.preventDefault();
            const checkboxes = document.querySelectorAll('.item-check');
            const isDeselect = toggleBtn.innerText === "Deselect all items";

            checkboxes.forEach(cb => {
                cb.checked = !isDeselect;
            });

            toggleBtn.innerText = isDeselect ? "Select all items" : "Deselect all items";
            updateCart();
        }
    });

    document.addEventListener('input', function (e) {
        if (e.target.classList.contains('qty-input')) {
            updateCart();
        }
    });

    document.addEventListener('change', function (e) {
        if (e.target.classList.contains('item-check')) {
            updateCart();

            const checkboxes = document.querySelectorAll('.item-check');
            const checkedBoxes = document.querySelectorAll('.item-check:checked');
            const toggleBtn = document.querySelector('.cart-header a');

            if (toggleBtn) {
                if (checkboxes.length > 0 && checkboxes.length === checkedBoxes.length) {
                    toggleBtn.innerText = "Deselect all items";
                } else {
                    toggleBtn.innerText = "Select all items";
                }
            }
        }
    });

    updateCart();
});