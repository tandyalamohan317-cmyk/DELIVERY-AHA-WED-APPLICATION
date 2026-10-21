import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  getStoredCart,
  setStoredCart,
  getStoredCatalog
} from '../data/storage';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();
  const initial = getStoredCart();

  const [cartItems, setCartItems] = useState(initial.items || []);
  const [restaurant, setRestaurant] = useState(initial.restaurant || null);
  const [coupon, setCoupon] = useState(initial.coupon || null);
  const [cookingInstructions, setCookingInstructions] = useState(initial.cookingInstructions || '');
  const [orderType, setOrderType] = useState(initial.orderType || 'DELIVERY');
  const [collisionModal, setCollisionModal] = useState({ isOpen: false, pendingItem: null, pendingRest: null, pendingCustomization: null });

  // Sync to LocalStorage
  useEffect(() => {
    setStoredCart({
      restaurant,
      items: cartItems,
      coupon,
      cookingInstructions,
      orderType
    });
  }, [restaurant, cartItems, coupon, cookingInstructions, orderType]);

  // Compute live bill totals
  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    
    // Delivery fee
    let deliveryFee = 35;
    if (subtotal === 0) deliveryFee = 0;
    else if (restaurant?.freeDeliveryAbove && subtotal >= restaurant.freeDeliveryAbove) deliveryFee = 0;
    else if (subtotal >= 450) deliveryFee = 0;

    // Platform fee & taxes
    const platformFee = subtotal > 0 ? 10 : 0;
    const packagingFee = subtotal > 0 ? 25 : 0;
    const taxes = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;

    // Coupon discount calculation
    let couponDiscount = 0;
    if (coupon && subtotal > 0) {
      if (coupon.type === 'PERCENTAGE' || coupon.discountPercent) {
        const percent = coupon.discountPercent || coupon.discountValue || 50;
        const max = coupon.maxDiscount || 100;
        couponDiscount = Math.min(Math.round((subtotal * percent) / 100), max);
      } else if (coupon.type === 'FLAT' || coupon.discountFlat) {
        couponDiscount = coupon.discountFlat || coupon.discountValue || 100;
      } else if (coupon.type === 'FREE_DELIVERY') {
        couponDiscount = deliveryFee;
      }
    }

    const grandTotal = Math.max(0, subtotal + deliveryFee + platformFee + packagingFee + taxes - couponDiscount);

    return {
      subtotal,
      deliveryFee,
      platformFee,
      packagingFee,
      taxes,
      couponDiscount,
      grandTotal,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    };
  }, [cartItems, restaurant, coupon]);

  // Add Item to cart
  const addItem = (food, targetRestaurant, customization = {}) => {
    // Check for restaurant conflict
    if (restaurant && restaurant.id !== targetRestaurant.id && cartItems.length > 0) {
      setCollisionModal({
        isOpen: true,
        pendingItem: food,
        pendingRest: targetRestaurant,
        pendingCustomization: customization
      });
      return false;
    }

    const size = customization.selectedSize || food.customization?.sizes?.[0] || { name: 'Regular', price: food.price };
    const addons = customization.selectedAddons || [];
    const addonsCost = addons.reduce((sum, a) => sum + (a.price || 0), 0);
    const unitPrice = size.price + addonsCost;
    const quantity = customization.quantity || 1;

    const itemKey = `${food.id}-${size.name}-${addons.map(a => a.name).sort().join('|')}`;

    setRestaurant(targetRestaurant);
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.key === itemKey);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            key: itemKey,
            foodId: food.id,
            name: food.name,
            image: food.image,
            isVeg: food.isVeg,
            unitPrice,
            quantity,
            selectedSize: size,
            selectedAddons: addons,
            spiceLevel: customization.spiceLevel || food.spiceLevel
          }
        ];
      }
    });

    showToast(`Added ${food.name} to your royal cart!`, 'success');
    return true;
  };

  const confirmCollisionReplace = () => {
    if (collisionModal.pendingItem && collisionModal.pendingRest) {
      setCartItems([]);
      setCoupon(null);
      setRestaurant(collisionModal.pendingRest);
      
      const food = collisionModal.pendingItem;
      const customization = collisionModal.pendingCustomization || {};
      const size = customization.selectedSize || food.customization?.sizes?.[0] || { name: 'Regular', price: food.price };
      const addons = customization.selectedAddons || [];
      const addonsCost = addons.reduce((sum, a) => sum + (a.price || 0), 0);
      const unitPrice = size.price + addonsCost;
      const quantity = customization.quantity || 1;
      const itemKey = `${food.id}-${size.name}-${addons.map(a => a.name).sort().join('|')}`;

      setCartItems([
        {
          key: itemKey,
          foodId: food.id,
          name: food.name,
          image: food.image,
          isVeg: food.isVeg,
          unitPrice,
          quantity,
          selectedSize: size,
          selectedAddons: addons,
          spiceLevel: customization.spiceLevel || food.spiceLevel
        }
      ]);

      showToast(`Cart updated with dishes from ${collisionModal.pendingRest.name}`, 'info');
    }
    setCollisionModal({ isOpen: false, pendingItem: null, pendingRest: null, pendingCustomization: null });
  };

  const cancelCollision = () => {
    setCollisionModal({ isOpen: false, pendingItem: null, pendingRest: null, pendingCustomization: null });
  };

  const updateQuantity = (itemKey, newQty) => {
    if (newQty <= 0) {
      removeItem(itemKey);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.key === itemKey ? { ...item, quantity: newQty } : item))
    );
  };

  const removeItem = (itemKey) => {
    setCartItems((prev) => {
      const remaining = prev.filter((item) => item.key !== itemKey);
      if (remaining.length === 0) {
        setRestaurant(null);
        setCoupon(null);
        showToast('Cart is now empty', 'info');
      } else {
        showToast('Item removed from cart', 'info');
      }
      return remaining;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurant(null);
    setCoupon(null);
    setCookingInstructions('');
    showToast('Cart cleared', 'info');
  };

  const applyCoupon = (couponCode) => {
    const code = (couponCode || '').trim().toUpperCase();
    if (!code) {
      showToast('Please enter a coupon code', 'warning');
      return false;
    }

    const catalog = getStoredCatalog();
    const found = (catalog.offers || []).find((o) => o.code.toUpperCase() === code);

    if (!found) {
      showToast(`Invalid coupon code: "${code}". Try AHA50 or FIRST100.`, 'error');
      return false;
    }

    if (found.minOrder && totals.subtotal < found.minOrder) {
      showToast(`Minimum order of ₹${found.minOrder} required for ${code}`, 'warning');
      return false;
    }

    setCoupon(found);
    showToast(`Royal Coupon ${code} applied successfully!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed from cart', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        restaurant,
        totals,
        coupon,
        cookingInstructions,
        setCookingInstructions,
        orderType,
        setOrderType,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}

      {/* Restaurant Conflict Modal */}
      {collisionModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full glass-panel-gold p-6 sm:p-8 rounded-3xl border border-amber-400/40 space-y-5 text-center shadow-2xl">
            <h3 className="text-xl font-bold text-white font-royal">Start a New Royal Order?</h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Your cart currently contains exquisite dishes from <strong className="text-amber-300">{restaurant?.name}</strong>. Adding items from <strong className="text-amber-300">{collisionModal.pendingRest?.name}</strong> will reset your active cart.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={cancelCollision}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all"
              >
                Keep Current Cart
              </button>
              <button
                onClick={confirmCollisionReplace}
                className="px-5 py-2.5 rounded-xl btn-royal-gold text-xs font-bold shadow transition-all"
              >
                Replace & Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
