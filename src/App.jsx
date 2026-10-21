import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { CartProvider } from './context/CartContext';

// Common Components
import Navbar from './components/common/Navbar';
import MobileBottomNav from './components/common/MobileBottomNav';
import Footer from './components/common/Footer';
import LocationModal from './components/common/LocationModal';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LocationPage from './pages/LocationPage';
import SearchPage from './pages/SearchPage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import FoodDetailPage from './pages/FoodDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import OffersPage from './pages/OffersPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderDetailPage from './pages/OrderDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import AddressesPage from './pages/AddressesPage';
import ReviewsPage from './pages/ReviewsPage';
import NotificationsPage from './pages/NotificationsPage';
import HelpPage from './pages/HelpPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <LocationProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-[#080314] text-[#F8F9FD] selection:bg-amber-400 selection:text-slate-950 font-sans">
              <ScrollToTop />
              <Navbar />

              <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <Routes>
                  {/* Customer Core Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/location" element={<LocationPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  
                  {/* Restaurants & Dishes */}
                  <Route path="/restaurants" element={<RestaurantsPage />} />
                  <Route path="/restaurants/:restaurantId" element={<RestaurantDetailPage />} />
                  <Route path="/food/:foodId" element={<FoodDetailPage />} />

                  {/* Cuisines */}
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/categories/:categoryId" element={<CategoryDetailPage />} />
                  <Route path="/offers" element={<OffersPage />} />

                  {/* Feast Order Flow */}
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
                  <Route path="/orders/:orderId/track" element={<OrderTrackingPage />} />
                  <Route path="/orders" element={<OrderHistoryPage />} />
                  <Route path="/orders/:orderId" element={<OrderDetailPage />} />

                  {/* Customer Portal */}
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/profile/edit" element={<ProfileEditPage />} />
                  <Route path="/profile/addresses" element={<AddressesPage />} />
                  <Route path="/profile/reviews" element={<ReviewsPage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/help" element={<HelpPage />} />
                  <Route path="/settings" element={<SettingsPage />} />

                  {/* Authentication */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />

                  {/* 404 Pages */}
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>

              {/* Modals & Bottom Navigation */}
              <LocationModal />
              <MobileBottomNav />
              <Footer />
            </div>
          </CartProvider>
        </LocationProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
