// AHA - A Taste Above | Master Mock Dataset

export const INITIAL_CITIES = [
  { id: 'city-hyd', name: 'Hyderabad', state: 'Telangana', areas: ['Banjara Hills', 'Jubilee Hills', 'Hitech City', 'Madhapur', 'Gachibowli', 'Kondapur', 'Begumpet', 'Charminar'], pincodes: ['500034', '500033', '500081', '500032'], isFeatured: true },
  { id: 'city-viz', name: 'Visakhapatnam', state: 'Andhra Pradesh', areas: ['Siripuram', 'MVP Colony', 'Beach Road', 'Dwaraka Nagar', 'Rushikonda', 'Gajuwaka'], pincodes: ['530003', '530017', '530045'], isFeatured: true },
  { id: 'city-vij', name: 'Vijayawada', state: 'Andhra Pradesh', areas: ['Benz Circle', 'MG Road', 'Governorpet', 'Bhavanipuram', 'Labbipet'], pincodes: ['520010', '520002', '520012'], isFeatured: true },
  { id: 'city-blr', name: 'Bengaluru', state: 'Karnataka', areas: ['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'MG Road', 'Jayanagar', 'Church Street'], pincodes: ['560038', '560034', '560102'], isFeatured: true },
  { id: 'city-chn', name: 'Chennai', state: 'Tamil Nadu', areas: ['T. Nagar', 'Anna Nagar', 'Adyar', 'Velachery', 'Nungambakkam', 'Mylapore', 'Besant Nagar'], pincodes: ['600017', '600040', '600020'], isFeatured: true },
  { id: 'city-mum', name: 'Mumbai', state: 'Maharashtra', areas: ['Bandra West', 'Colaba', 'Juhu', 'Andheri West', 'Powai', 'Lower Parel', 'Worli'], pincodes: ['400050', '400005', '400049'], isFeatured: true },
  { id: 'city-pun', name: 'Pune', state: 'Maharashtra', areas: ['Koregaon Park', 'Kothrud', 'Viman Nagar', 'Baner', 'Kalyani Nagar', 'Aundh'], pincodes: ['411001', '411038', '411014'], isFeatured: true },
  { id: 'city-del', name: 'Delhi', state: 'Delhi NCR', areas: ['Connaught Place', 'Hauz Khas', 'Defence Colony', 'South Extension', 'Chandni Chowk', 'Greater Kailash'], pincodes: ['110001', '110016', '110024'], isFeatured: true },
  { id: 'city-kol', name: 'Kolkata', state: 'West Bengal', areas: ['Park Street', 'Salt Lake', 'Ballygunge', 'New Town', 'Howrah', 'Alipore'], pincodes: ['700016', '700064', '700019'], isFeatured: true },
  { id: 'city-koc', name: 'Kochi', state: 'Kerala', areas: ['Marine Drive', 'Panampilly Nagar', 'Kakkanad', 'Edappally', 'Fort Kochi'], pincodes: ['682031', '682036', '682030'], isFeatured: true },
  { id: 'city-ahm', name: 'Ahmedabad', state: 'Gujarat', areas: ['Navrangpura', 'Bodakdev', 'Satellite', 'Vastrapur', 'SG Highway', 'Prahlad Nagar'], pincodes: ['380009', '380054', '380015'], isFeatured: true },
  { id: 'city-jai', name: 'Jaipur', state: 'Rajasthan', areas: ['C-Scheme', 'Malviya Nagar', 'Vaishali Nagar', 'Raja Park', 'Mansarovar', 'Tonk Road'], pincodes: ['302001', '302017', '302021'], isFeatured: true }
];

export const INITIAL_CATEGORIES = [
  { id: 'biryani', name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', description: 'Royal aromatic dum biryanis cooked to golden perfection' },
  { id: 'pizza', name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', description: 'Artisanal wood-fired sourdough pizzas with royal toppings' },
  { id: 'burger', name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', description: 'Juicy gourmet handcrafted brioche burgers and crisp fries' },
  { id: 'south-indian', name: 'South Indian', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80', description: 'Crispy ghee roast dosas, fluffy idlis, and traditional chutneys' },
  { id: 'north-indian', name: 'North Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80', description: 'Rich buttery makhani gravies, tandoori breads, and paneer' },
  { id: 'chinese', name: 'Chinese', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', description: 'Wok-tossed hakka noodles, dim sums, and fiery manchurian' },
  { id: 'desserts', name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80', description: 'Shahi tukda, saffron rasmalai, gulab jamun, and rabdi' },
  { id: 'cakes', name: 'Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', description: 'Artisanal celebration cakes, pastries, and Belgian brownies' },
  { id: 'healthy-food', name: 'Healthy Food', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', description: 'Protein bowls, quinoa super-salads, and organic cold presses' },
  { id: 'rolls', name: 'Rolls', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80', description: 'Flaky Kolkata kathi rolls, paneer wraps, and shawarmas' },
  { id: 'momos', name: 'Momos', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', description: 'Steamed Himalayan dumplings, kurkure momos, and spicy dips' },
  { id: 'thali', name: 'Thali', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80', description: 'Grand heritage thalis with 9 varieties of royal curries' },
  { id: 'beverages', name: 'Beverages', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80', description: 'Irani chai, South Indian filter kaapi, mango lassi, and mojitos' },
  { id: 'breakfast', name: 'Breakfast', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80', description: 'Steaming morning feasts, poori sagu, and buttery parathas' },
  { id: 'mughlai', name: 'Mughlai', image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80', description: 'Nawabi kormas, slow-cooked haleem, and decadent roasts' },
  { id: 'kebabs', name: 'Kebabs & Tandoor', image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80', description: 'Charcoal grilled galouti kebabs, seekh skewers, and tikkas' }
];

export const INITIAL_RESTAURANTS = [
  {
    id: 'rest-1',
    name: 'Royal Hyderabadi Bawarchi',
    slug: 'royal-hyderabadi-bawarchi',
    tagline: 'Legacy of Royal Dum Cooking since 1954',
    description: 'Heritage kitchen celebrated for slow charcoal dum cooking with handpicked saffron, whole masalas, and age-old Nizam traditions.',
    city: 'Hyderabad',
    area: 'Banjara Hills',
    address: 'Road No 1, Banjara Hills, Hyderabad',
    cuisines: ['Biryani', 'Mughlai', 'Kebabs', 'North Indian'],
    costForTwo: 550,
    rating: 4.8,
    ratingCount: 840,
    deliveryTimeMin: 28,
    distanceKm: 2.4,
    isPureVeg: false,
    isAhaSelect: true,
    isFeatured: true,
    coverImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    offer: '50% OFF up to ₹100',
    deliveryFee: 30,
    freeDeliveryAbove: 450
  },
  {
    id: 'rest-2',
    name: 'Chutneys Royal Tiffin Temple',
    slug: 'chutneys-royal-tiffin-temple',
    tagline: '7 Legendary Chutneys & Ghee Roasts',
    description: 'Deccan vegetarian sanctuary famous for steaming Babai Idlis, Guntur Karam Dosa, MLA Pesarattu, and seven freshly ground chutneys.',
    city: 'Hyderabad',
    area: 'Jubilee Hills',
    address: 'Road No 36, Jubilee Hills, Hyderabad',
    cuisines: ['South Indian', 'Breakfast', 'Thali'],
    costForTwo: 350,
    rating: 4.7,
    ratingCount: 620,
    deliveryTimeMin: 22,
    distanceKm: 1.8,
    isPureVeg: true,
    isAhaSelect: true,
    isFeatured: true,
    coverImage: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1000&q=80',
    offer: '20% OFF on all South Feasts',
    deliveryFee: 25,
    freeDeliveryAbove: 350
  },
  {
    id: 'rest-3',
    name: 'Pista House Haleem & Confectionery',
    slug: 'pista-house-haleem-confectionery',
    tagline: 'World Renowned GI-Tagged Haleem',
    description: 'Historic institution world-famous for tender mutton haleem slow-cooked with pure ghee, crispy Osmania biscuits, and royal desserts.',
    city: 'Hyderabad',
    area: 'Charminar',
    address: 'Nayapul, Near Charminar, Hyderabad',
    cuisines: ['Mughlai', 'Biryani', 'Desserts', 'Beverages'],
    costForTwo: 450,
    rating: 4.9,
    ratingCount: 1420,
    deliveryTimeMin: 32,
    distanceKm: 4.2,
    isPureVeg: false,
    isAhaSelect: true,
    isFeatured: true,
    coverImage: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1000&q=80',
    offer: 'Free Sweet on Orders > ₹499',
    deliveryFee: 35,
    freeDeliveryAbove: 500
  },
  {
    id: 'rest-4',
    name: 'Sea Inn Coastal Andhra Dhaba',
    slug: 'sea-inn-coastal-andhra-dhaba',
    tagline: 'Authentic Rushikonda Seafood Curries',
    description: 'Renowned coastal haven crafting spicy Vanjaram fish fry, crab iguru, Royyala vepudu, and piping hot Andhra meals.',
    city: 'Visakhapatnam',
    area: 'Beach Road',
    address: 'Rushikonda Beach Road, Visakhapatnam',
    cuisines: ['South Indian', 'Thali', 'Biryani'],
    costForTwo: 650,
    rating: 4.8,
    ratingCount: 510,
    deliveryTimeMin: 30,
    distanceKm: 3.1,
    isPureVeg: false,
    isAhaSelect: true,
    isFeatured: false,
    coverImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
    offer: 'Flat ₹75 OFF on Seafood',
    deliveryFee: 35,
    freeDeliveryAbove: 550
  },
  {
    id: 'rest-5',
    name: 'Babai Hotel Tiffin Heritage',
    slug: 'babai-hotel-tiffin-heritage',
    tagline: 'Serving Butter-Topped Idlis Since 1942',
    description: 'Legendary Vijayawada temple of taste famous for dollops of white butter melting over steaming soft idlis and spicy podi.',
    city: 'Vijayawada',
    area: 'Governorpet',
    address: 'Nageswara Rao Pantulu Road, Vijayawada',
    cuisines: ['South Indian', 'Breakfast', 'Beverages'],
    costForTwo: 250,
    rating: 4.9,
    ratingCount: 780,
    deliveryTimeMin: 20,
    distanceKm: 1.5,
    isPureVeg: true,
    isAhaSelect: true,
    isFeatured: true,
    coverImage: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1000&q=80',
    offer: '15% OFF Morning Orders',
    deliveryFee: 20,
    freeDeliveryAbove: 250
  },
  {
    id: 'rest-6',
    name: 'Vidyarthi Bhavan Gandhi Bazaar',
    slug: 'vidyarthi-bhavan-gandhi-bazaar',
    tagline: 'The Golden Crispy Benne Masala Dosa',
    description: 'Bengaluru historic establishment running since 1943. Butter-dripping Benne Masala Dosas paired with signature thick coconut chutney.',
    city: 'Bengaluru',
    area: 'Indiranagar',
    address: '100 Feet Road, Indiranagar, Bengaluru',
    cuisines: ['South Indian', 'Breakfast', 'Beverages'],
    costForTwo: 300,
    rating: 4.8,
    ratingCount: 1150,
    deliveryTimeMin: 24,
    distanceKm: 2.1,
    isPureVeg: true,
    isAhaSelect: true,
    isFeatured: true,
    coverImage: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1000&q=80',
    offer: 'Flat ₹50 OFF on Dosas',
    deliveryFee: 25,
    freeDeliveryAbove: 350
  },
  {
    id: 'rest-7',
    name: 'Bukhara Royal Tandoor',
    slug: 'bukhara-royal-tandoor',
    tagline: 'World Legendary Dal Bukhara Since 1978',
    description: 'Renowned culinary palace where black lentils are slow-simmered over glowing embers for 18 continuous hours.',
    city: 'Delhi',
    area: 'Connaught Place',
    address: 'Diplomatic Enclave / Scindia House, New Delhi',
    cuisines: ['North Indian', 'Kebabs', 'Mughlai'],
    costForTwo: 1400,
    rating: 4.9,
    ratingCount: 890,
    deliveryTimeMin: 38,
    distanceKm: 4.5,
    isPureVeg: false,
    isAhaSelect: true,
    isFeatured: true,
    coverImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80',
    offer: 'Complimentary Garlic Naan',
    deliveryFee: 40,
    freeDeliveryAbove: 800
  },
  {
    id: 'rest-8',
    name: 'Karim’s Historic Old Delhi Kitchen',
    slug: 'karims-historic-old-delhi-kitchen',
    tagline: 'Descendants of Imperial Mughal Chefs',
    description: 'Serving royal mutton korma, tender seekh kebabs, butter chicken, and tandoori rotis cooked in historic clay ovens.',
    city: 'Delhi',
    area: 'Chandni Chowk',
    address: 'Gali Kababian, Jama Masjid, Delhi',
    cuisines: ['Mughlai', 'Kebabs', 'North Indian', 'Biryani'],
    costForTwo: 750,
    rating: 4.7,
    ratingCount: 1300,
    deliveryTimeMin: 35,
    distanceKm: 3.8,
    isPureVeg: false,
    isAhaSelect: true,
    isFeatured: true,
    coverImage: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80',
    offer: '20% OFF with code AHA50',
    deliveryFee: 35,
    freeDeliveryAbove: 600
  },
  {
    id: 'rest-9',
    name: 'Peter Cat Park Street Aristocracy',
    slug: 'peter-cat-park-street-aristocracy',
    tagline: 'Home of the World Famous Chelo Kebab',
    description: 'Iconic Kolkata institution serving juicy Persian-style Chelo Kebabs over steaming buttered basmati rice and poached eggs.',
    city: 'Kolkata',
    area: 'Park Street',
    address: '18A, Park Street, Kolkata',
    cuisines: ['Kebabs', 'North Indian', 'Rolls'],
    costForTwo: 850,
    rating: 4.9,
    ratingCount: 960,
    deliveryTimeMin: 28,
    distanceKm: 2.2,
    isPureVeg: false,
    isAhaSelect: true,
    isFeatured: true,
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    offer: '15% OFF Orders > ₹700',
    deliveryFee: 30,
    freeDeliveryAbove: 500
  },
  {
    id: 'rest-10',
    name: 'Tunday Kababi Royal Awadh',
    slug: 'tunday-kababi-royal-awadh',
    tagline: 'Melt-in-Mouth Galouti Kebabs with 160 Spices',
    description: 'Secret century-old Awadhi recipe crafted for the royal Nawabs of Lucknow. Delicate melt-in-mouth texture with sheer korma.',
    city: 'Lucknow',
    area: 'Hazratganj',
    address: 'Naaz Cinema Road, Hazratganj, Lucknow',
    cuisines: ['Kebabs', 'Mughlai', 'Biryani', 'Rolls'],
    costForTwo: 500,
    rating: 5.0,
    ratingCount: 1680,
    deliveryTimeMin: 25,
    distanceKm: 2.0,
    isPureVeg: false,
    isAhaSelect: true,
    isFeatured: true,
    coverImage: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80',
    offer: 'Flat ₹100 OFF on Platters',
    deliveryFee: 25,
    freeDeliveryAbove: 450
  },
  {
    id: 'rest-11',
    name: 'Artisan Wood-Fired Pizza Co.',
    slug: 'artisan-wood-fired-pizza-co',
    tagline: '48-Hour Fermented Neapolitan Crust',
    description: 'Gourmet Italian pizzeria using imported San Marzano tomatoes, buffalo mozzarella, and fresh sweet basil.',
    city: 'Mumbai',
    area: 'Bandra West',
    address: 'Hill Road, Bandra West, Mumbai',
    cuisines: ['Pizza', 'Burger', 'Beverages'],
    costForTwo: 800,
    rating: 4.7,
    ratingCount: 430,
    deliveryTimeMin: 29,
    distanceKm: 2.6,
    isPureVeg: false,
    isAhaSelect: false,
    isFeatured: false,
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    offer: 'Buy 1 Get 1 on Medium Pizzas',
    deliveryFee: 30,
    freeDeliveryAbove: 600
  },
  {
    id: 'rest-12',
    name: 'Gourmet Burger Guild',
    slug: 'gourmet-burger-guild',
    tagline: 'Smash Patties & Truffle Parmesan Fries',
    description: 'Craft burger joint creating smash patties on golden toasted brioche buns with secret smoked garlic aioli.',
    city: 'Bengaluru',
    area: 'Koramangala',
    address: '5th Block, Koramangala, Bengaluru',
    cuisines: ['Burger', 'Beverages', 'Healthy Food'],
    costForTwo: 600,
    rating: 4.6,
    ratingCount: 390,
    deliveryTimeMin: 26,
    distanceKm: 2.3,
    isPureVeg: false,
    isAhaSelect: false,
    isFeatured: false,
    coverImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    offer: 'Free Peri-Peri Fries',
    deliveryFee: 25,
    freeDeliveryAbove: 400
  },
  {
    id: 'rest-13',
    name: 'Dragon Wok Asian Bistro',
    slug: 'dragon-wok-asian-bistro',
    tagline: 'Authentic Cantonese & Sichuan Street Flavors',
    description: 'Master chef wok tossed noodles, crispy chili baby corn, steamed crystal dim sums, and fiery Thai curries.',
    city: 'Chennai',
    area: 'Nungambakkam',
    address: 'Khadar Nawaz Khan Road, Chennai',
    cuisines: ['Chinese', 'Momos', 'Healthy Food'],
    costForTwo: 650,
    rating: 4.6,
    ratingCount: 320,
    deliveryTimeMin: 30,
    distanceKm: 2.9,
    isPureVeg: false,
    isAhaSelect: false,
    isFeatured: false,
    coverImage: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1000&q=80',
    offer: '20% OFF with code SAVE20',
    deliveryFee: 30,
    freeDeliveryAbove: 500
  },
  {
    id: 'rest-14',
    name: 'Sweet Bengal Royal Mithai',
    slug: 'sweet-bengal-royal-mithai',
    tagline: 'Fresh Chhena Sandesh & Hot Gulab Jamun',
    description: 'Kolkata confectionery master baking authentic Mishti Doi, soft spongy rasgullas, and dry fruit loaded kaju katli.',
    city: 'Kolkata',
    area: 'Salt Lake',
    address: 'Sector 1, Salt Lake, Kolkata',
    cuisines: ['Desserts', 'Cakes', 'Breakfast'],
    costForTwo: 300,
    rating: 4.8,
    ratingCount: 540,
    deliveryTimeMin: 18,
    distanceKm: 1.4,
    isPureVeg: true,
    isAhaSelect: true,
    isFeatured: false,
    coverImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    offer: '10% OFF on Festive Sweets',
    deliveryFee: 20,
    freeDeliveryAbove: 300
  },
  {
    id: 'rest-15',
    name: 'Kolkata Kathi Roll Junction',
    slug: 'kolkata-kathi-roll-junction',
    tagline: 'Golden Parathas Rolled with Spicy Fillings',
    description: 'Parathas crisped with egg, filled with charcoal grilled chicken boti, sliced red onions, green chilies, and tangy chaat lime.',
    city: 'Kolkata',
    area: 'Park Street',
    address: 'Free School Street, Kolkata',
    cuisines: ['Rolls', 'Kebabs', 'Street Food'],
    costForTwo: 280,
    rating: 4.7,
    ratingCount: 680,
    deliveryTimeMin: 20,
    distanceKm: 1.6,
    isPureVeg: false,
    isAhaSelect: false,
    isFeatured: false,
    coverImage: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80',
    offer: 'Roll Combos starting at ₹149',
    deliveryFee: 20,
    freeDeliveryAbove: 250
  },
  {
    id: 'rest-16',
    name: 'Tibetan Momo House',
    slug: 'tibetan-momo-house',
    tagline: 'Juicy Steamed, Fried & Tandoori Momos',
    description: 'Thin delicate flour pouches packed with seasoned chicken, fresh greens, and served with spicy red roasted tomato chili chutney.',
    city: 'Delhi',
    area: 'Hauz Khas',
    address: 'Hauz Khas Village, New Delhi',
    cuisines: ['Momos', 'Chinese', 'Healthy Food'],
    costForTwo: 320,
    rating: 4.7,
    ratingCount: 470,
    deliveryTimeMin: 22,
    distanceKm: 1.9,
    isPureVeg: false,
    isAhaSelect: false,
    isFeatured: false,
    coverImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
    offer: 'Platter of 12 Momos @ ₹199',
    deliveryFee: 20,
    freeDeliveryAbove: 300
  },
  {
    id: 'rest-17',
    name: 'Agashiye Heritage Gujarati Thali',
    slug: 'agashiye-heritage-gujarati-thali',
    tagline: 'Traditional Royal Dining On Brass Plates',
    description: 'Authentic seasonal Gujarati thali featuring Dhokla, sweet kadhi, Undhiyu, fresh Phulkas with white butter, and Aamras.',
    city: 'Ahmedabad',
    area: 'Navrangpura',
    address: 'The House of MG, Opp Sidi Saiyyed Mosque, Ahmedabad',
    cuisines: ['Thali', 'South Indian', 'Desserts'],
    costForTwo: 900,
    rating: 4.9,
    ratingCount: 610,
    deliveryTimeMin: 35,
    distanceKm: 3.5,
    isPureVeg: true,
    isAhaSelect: true,
    isFeatured: true,
    coverImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80',
    offer: '10% OFF Family Thali Packs',
    deliveryFee: 35,
    freeDeliveryAbove: 700
  },
  {
    id: 'rest-18',
    name: 'Chokhi Dhani Royal Kitchen',
    slug: 'chokhi-dhani-royal-kitchen',
    tagline: 'Traditional Rajasthani Dal Baati Churma',
    description: 'Wood-baked baatis soaked in pure desi ghee, served with panchmel dal, spicy gatte ki sabzi, and dry fruit churma.',
    city: 'Jaipur',
    area: 'C-Scheme',
    address: '12 Miles, Tonk Road / C-Scheme, Jaipur',
    cuisines: ['Thali', 'North Indian', 'Desserts'],
    costForTwo: 750,
    rating: 4.8,
    ratingCount: 520,
    deliveryTimeMin: 30,
    distanceKm: 3.2,
    isPureVeg: true,
    isAhaSelect: true,
    isFeatured: true,
    coverImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    offer: 'Free Desi Ghee Churma',
    deliveryFee: 30,
    freeDeliveryAbove: 500
  },
  {
    id: 'rest-19',
    name: 'Green Goddess Organic Bowls',
    slug: 'green-goddess-organic-bowls',
    tagline: 'Clean Nutrition, Cold Presses & Keto Meals',
    description: 'Nutrient-rich quinoa salad bowls, avocado sourdough toasts, high-protein grilled chicken, and natural cold-pressed juices.',
    city: 'Bengaluru',
    area: 'HSR Layout',
    address: 'Sector 3, HSR Layout, Bengaluru',
    cuisines: ['Healthy Food', 'Beverages', 'Breakfast'],
    costForTwo: 550,
    rating: 4.7,
    ratingCount: 290,
    deliveryTimeMin: 25,
    distanceKm: 2.0,
    isPureVeg: false,
    isAhaSelect: false,
    isFeatured: false,
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    offer: 'Flat ₹50 OFF on Detox Bowls',
    deliveryFee: 25,
    freeDeliveryAbove: 400
  },
  {
    id: 'rest-20',
    name: 'Kyani & Co. Heritage Irani Cafe',
    slug: 'kyani-and-co-heritage-irani-cafe',
    tagline: 'Bun Maska, Irani Chai & Mutton Puffs Since 1904',
    description: 'Mumbai legendary Irani cafe known for warm freshly baked bun maska dipped in steaming hot cardamom infused sweet Irani chai.',
    city: 'Mumbai',
    area: 'Colaba',
    address: 'Marine Lines, Near Colaba, Mumbai',
    cuisines: ['Beverages', 'Breakfast', 'Cakes'],
    costForTwo: 280,
    rating: 4.8,
    ratingCount: 880,
    deliveryTimeMin: 20,
    distanceKm: 1.7,
    isPureVeg: false,
    isAhaSelect: true,
    isFeatured: false,
    coverImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    offer: 'Chai & Bun Combo @ ₹99',
    deliveryFee: 20,
    freeDeliveryAbove: 200
  },
  {
    id: 'rest-21',
    name: 'Belgian Waffle & Patisserie',
    slug: 'belgian-waffle-and-patisserie',
    tagline: 'Warm Crispy Waffles & Chocolate Ganache',
    description: 'Freshly baked golden Belgian waffles layered with melted dark chocolate, salted caramel, Nutella, and roasted almonds.',
    city: 'Pune',
    area: 'Koregaon Park',
    address: 'North Main Road, Koregaon Park, Pune',
    cuisines: ['Cakes', 'Desserts', 'Beverages'],
    costForTwo: 400,
    rating: 4.7,
    ratingCount: 360,
    deliveryTimeMin: 22,
    distanceKm: 1.8,
    isPureVeg: true,
    isAhaSelect: false,
    isFeatured: false,
    coverImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
    offer: 'Free Brownie on 2 Waffles',
    deliveryFee: 25,
    freeDeliveryAbove: 350
  }
];

export const INITIAL_FOODS = [
  // Royal Hyderabadi Bawarchi
  {
    id: 'food-1',
    name: 'Nizami Royal Mutton Dum Biryani',
    restaurantId: 'rest-1',
    categoryId: 'biryani',
    description: 'Long-grain aged Basmati rice layered with tender mutton shank cuts, slow-cooked in handi with saffron, pure ghee, and 32 secret spices.',
    price: 440,
    rating: 4.9,
    ratingCount: 380,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Medium',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: 'Regular Portion (Single)', price: 440 },
        { name: 'Royal Large (Serves 2)', price: 690 },
        { name: 'Family Dum Handi (Serves 4)', price: 1250 }
      ],
      addons: [
        { name: 'Extra Salan & Mint Raita Gravy', price: 40 },
        { name: 'Boiled Egg & Fried Saffron Onions', price: 35 },
        { name: 'Double Mutton Boti Topping', price: 120 }
      ]
    }
  },
  {
    id: 'food-2',
    name: 'Special Chicken Dum Biryani',
    restaurantId: 'rest-1',
    categoryId: 'biryani',
    description: 'Succulent chicken pieces marinated in brown onions, whole spices, fresh yogurt, and dum cooked over aromatic basmati rice.',
    price: 360,
    rating: 4.8,
    ratingCount: 420,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Medium Spicy',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: 'Regular Portion', price: 360 },
        { name: 'Royal Large', price: 560 }
      ],
      addons: [
        { name: 'Extra Mirchi Ka Salan', price: 30 },
        { name: 'Extra Boiled Egg', price: 20 }
      ]
    }
  },
  {
    id: 'food-3',
    name: 'Royal Shahi Paneer Dum Handi',
    restaurantId: 'rest-1',
    categoryId: 'biryani',
    description: 'Tender cottage cheese cubes tossed in fragrant saffron, mint, cashews, and slow cooked with aged basmati rice.',
    price: 320,
    rating: 4.7,
    ratingCount: 190,
    isVeg: true,
    isBestseller: false,
    spiceLevel: 'Mild',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: 'Regular Portion', price: 320 },
        { name: 'Large Portion', price: 490 }
      ],
      addons: [
        { name: 'Extra Fried Cashews & Raisins', price: 45 }
      ]
    }
  },
  {
    id: 'food-4',
    name: 'Murgh Malai Tikka Kebab',
    restaurantId: 'rest-1',
    categoryId: 'kebabs',
    description: 'Boneless chicken cubes steeped in fresh cream, cardamom, cheese, and crushed green chilies, grilled over charcoal coals.',
    price: 380,
    rating: 4.9,
    ratingCount: 260,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Mild',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: '6 Pieces Plate', price: 380 },
        { name: '12 Pieces Platter', price: 680 }
      ],
      addons: [
        { name: 'Mint Chutney & Laccha Onion', price: 25 },
        { name: 'Rumali Roti Pair', price: 40 }
      ]
    }
  },
  {
    id: 'food-5',
    name: 'Royal Shahi Tukda with Rabdi',
    restaurantId: 'rest-1',
    categoryId: 'desserts',
    description: 'Crisp golden bread soaked in saffron infused sugar syrup, topped with thick reduced malai rabdi, silver vark, and crushed pistachios.',
    price: 190,
    rating: 4.9,
    ratingCount: 310,
    isVeg: true,
    isBestseller: true,
    spiceLevel: 'Sweet',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: '2 Pieces Platter', price: 190 },
        { name: '4 Pieces Celebration Box', price: 340 }
      ],
      addons: [
        { name: 'Extra Malai Rabdi Cup', price: 50 }
      ]
    }
  },

  // Chutneys Royal Tiffin Temple
  {
    id: 'food-6',
    name: 'Guntur Karam Ghee Roast Dosa',
    restaurantId: 'rest-2',
    categoryId: 'south-indian',
    description: 'Golden paper-thin crispy dosa smeared with fiery Andhra red chili garlic relish and roasted in pure cow ghee.',
    price: 180,
    rating: 4.8,
    ratingCount: 390,
    isVeg: true,
    isBestseller: true,
    spiceLevel: 'Spicy',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: 'Standard Single Dosa', price: 180 },
        { name: 'Double Crisp Ghee Roast', price: 240 }
      ],
      addons: [
        { name: 'Extra Gunpowder Podi', price: 25 },
        { name: 'Extra Sambar Bowl', price: 30 }
      ]
    }
  },
  {
    id: 'food-7',
    name: 'Steaming Babai Idli with White Butter',
    restaurantId: 'rest-2',
    categoryId: 'south-indian',
    description: 'Pillowy soft idlis crowned with a generous dollop of pure homemade white butter, served with 7 signature chutneys.',
    price: 150,
    rating: 4.9,
    ratingCount: 420,
    isVeg: true,
    isBestseller: true,
    spiceLevel: 'Mild',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: '3 Pieces Plate', price: 150 },
        { name: '5 Pieces Feast Plate', price: 220 }
      ],
      addons: [
        { name: 'Extra White Butter Ball', price: 30 }
      ]
    }
  },
  {
    id: 'food-8',
    name: 'MLA Pesarattu with Upma',
    restaurantId: 'rest-2',
    categoryId: 'breakfast',
    description: 'Traditional whole green moong dal crepe stuffed with seasoned ginger upma and served with sweet allam (ginger) chutney.',
    price: 190,
    rating: 4.7,
    ratingCount: 220,
    isVeg: true,
    isBestseller: false,
    spiceLevel: 'Medium',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: 'Single Pesarattu', price: 190 }
      ],
      addons: [
        { name: 'Extra Ginger Chutney', price: 20 }
      ]
    }
  },

  // Pista House
  {
    id: 'food-9',
    name: 'Special Hyderabadi Mutton Haleem',
    restaurantId: 'rest-3',
    categoryId: 'mughlai',
    description: 'World-famous GI tagged recipe slow-pounded for 12 hours with goat meat, broken wheat, lentils, and pure desi ghee.',
    price: 290,
    rating: 5.0,
    ratingCount: 650,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Medium',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: 'Regular Handi (500ml)', price: 290 },
        { name: 'Royal Celebration Tub (1kg)', price: 550 }
      ],
      addons: [
        { name: 'Ghee-Fried Cashews Garnish', price: 40 },
        { name: 'Zesty Lime & Fresh Mint', price: 15 }
      ]
    }
  },
  {
    id: 'food-10',
    name: 'Crispy Osmania Biscuits Box',
    restaurantId: 'rest-3',
    categoryId: 'beverages',
    description: 'Iconic sweet and salty melt-in-mouth heritage biscuits, the classic royal tea accompaniment in the Nizam kingdom.',
    price: 160,
    rating: 4.8,
    ratingCount: 380,
    isVeg: true,
    isBestseller: false,
    spiceLevel: 'Mild',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: '250g Box', price: 160 },
        { name: '500g Gift Tin', price: 290 }
      ]
    }
  },

  // Bukhara Royal Tandoor
  {
    id: 'food-11',
    name: 'Legendary Dal Bukhara',
    restaurantId: 'rest-7',
    categoryId: 'north-indian',
    description: 'Black lentils slow-simmered over charcoal embers for 18 hours with vine-ripened tomatoes, fresh garlic, cream, and unsalted butter.',
    price: 650,
    rating: 4.9,
    ratingCount: 520,
    isVeg: true,
    isBestseller: true,
    spiceLevel: 'Mild',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: 'Standard Copper Pot', price: 650 },
        { name: 'Family Handi', price: 1150 }
      ],
      addons: [
        { name: 'Butter Garlic Naan Pair', price: 120 },
        { name: 'Laccha Paratha', price: 80 }
      ]
    }
  },
  {
    id: 'food-12',
    name: 'Old Delhi Butter Chicken (Murgh Makhani)',
    restaurantId: 'rest-8',
    categoryId: 'north-indian',
    description: 'Charcoal grilled tandoori chicken cooked in silky velvety tomato gravy infused with fresh cream, kasoori methi, and white butter.',
    price: 460,
    rating: 4.9,
    ratingCount: 490,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Mild',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: 'Half (2 Servings)', price: 460 },
        { name: 'Full (4 Servings)', price: 790 }
      ],
      addons: [
        { name: 'Khamiri Roti Pair', price: 60 },
        { name: 'Garlic Naan', price: 65 }
      ]
    }
  },
  {
    id: 'food-13',
    name: 'Melt-in-Mouth Galouti Kebab',
    restaurantId: 'rest-10',
    categoryId: 'kebabs',
    description: 'Finely minced mutton marinated in raw papaya, rose water, and 160 secret herbs, pan-seared to melt instantaneously.',
    price: 390,
    rating: 5.0,
    ratingCount: 680,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Medium',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: '4 Pieces with Mughlai Paratha', price: 390 },
        { name: '8 Pieces Feast Platter', price: 720 }
      ],
      addons: [
        { name: 'Extra Mughlai Paratha', price: 50 },
        { name: 'Spicy Green Mint Chutney', price: 20 }
      ]
    }
  },
  {
    id: 'food-14',
    name: 'Chelo Kebab Majestic Platter',
    restaurantId: 'rest-9',
    categoryId: 'kebabs',
    description: 'Tender mutton seekh kebab and chicken tikka served on steaming buttered basmati rice, grilled tomato, and a poached golden egg yolk.',
    price: 490,
    rating: 4.9,
    ratingCount: 440,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Mild',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: 'Single Platter', price: 490 },
        { name: 'Jumbo Royal Chelo', price: 790 }
      ]
    }
  },

  // Western / Pizza / Burger / Chinese / Momos
  {
    id: 'food-15',
    name: 'Truffle Burrata Margherita Pizza',
    restaurantId: 'rest-11',
    categoryId: 'pizza',
    description: 'Wood-fired sourdough base, Italian San Marzano sauce, fresh burrata ball, white truffle oil drizzle, and sweet basil.',
    price: 520,
    rating: 4.8,
    ratingCount: 290,
    isVeg: true,
    isBestseller: true,
    spiceLevel: 'Mild',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: '10 inch Medium', price: 520 },
        { name: '12 inch Large', price: 720 }
      ],
      addons: [
        { name: 'Extra Burrata Cheese', price: 90 },
        { name: 'Garlic Butter Crust Dip', price: 40 }
      ]
    }
  },
  {
    id: 'food-16',
    name: 'Smoked Gouda Double Smash Burger',
    restaurantId: 'rest-12',
    categoryId: 'burger',
    description: 'Two seared juicy patties with molten smoked gouda, caramelized balsamic onions, and garlic herb aioli on toasted brioche.',
    price: 340,
    rating: 4.7,
    ratingCount: 210,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Medium',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: 'Single Burger', price: 340 },
        { name: 'Meal with Fries & Shake', price: 490 }
      ],
      addons: [
        { name: 'Extra Cheese Slice', price: 35 },
        { name: 'Truffle Fries Upgrade', price: 60 }
      ]
    }
  },
  {
    id: 'food-17',
    name: 'Himalayan Steamed Chicken Momos',
    restaurantId: 'rest-16',
    categoryId: 'momos',
    description: 'Delicate hand-pinched dumplings packed with juicy minced chicken, ginger, and spring onions. Served with spicy charred chili dip.',
    price: 190,
    rating: 4.8,
    ratingCount: 380,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Medium',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: '8 Pieces Steamed', price: 190 },
        { name: '8 Pieces Pan-Fried Kurkure', price: 230 }
      ],
      addons: [
        { name: 'Extra Fiery Chili Dip', price: 20 },
        { name: 'Creamy Mayo Dip', price: 25 }
      ]
    }
  },
  {
    id: 'food-18',
    name: 'Kolkata Double Egg Chicken Roll',
    restaurantId: 'rest-15',
    categoryId: 'rolls',
    description: 'Flaky layered laccha paratha with double farm fresh eggs, spiced boneless chicken chunks, raw onions, and lime chaat seasoning.',
    price: 170,
    rating: 4.8,
    ratingCount: 460,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Medium Spicy',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: 'Standard Jumbo Roll', price: 170 }
      ],
      addons: [
        { name: 'Extra Cheese Spread', price: 30 }
      ]
    }
  },
  {
    id: 'food-19',
    name: 'Grand Royal Rajasthani Thali',
    restaurantId: 'rest-18',
    categoryId: 'thali',
    description: 'Elaborate royal feast with Baati, Panchmel Dal, Gatte ki Sabzi, Ker Sangri, Jodhpur Mirchi Vada, Bajra Roti, and Desi Ghee Churma.',
    price: 490,
    rating: 4.9,
    ratingCount: 330,
    isVeg: true,
    isBestseller: true,
    spiceLevel: 'Medium',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: 'Single Royal Thali', price: 490 },
        { name: 'Family Maharana Thali (Serves 2)', price: 890 }
      ]
    }
  },
  {
    id: 'food-20',
    name: 'Avocado Quinoa Green Goddess Bowl',
    restaurantId: 'rest-19',
    categoryId: 'healthy-food',
    description: 'Tricolor quinoa, Hass avocado slices, baby spinach, roasted chickpeas, feta cheese, and lemon herb tahini dressing.',
    price: 360,
    rating: 4.7,
    ratingCount: 180,
    isVeg: true,
    isBestseller: false,
    spiceLevel: 'Mild',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    customization: {
      sizes: [
        { name: 'Standard Bowl', price: 360 }
      ],
      addons: [
        { name: 'Grilled Herb Chicken Topping', price: 80 },
        { name: 'Extra Avocado Mash', price: 60 }
      ]
    }
  }
];

export const INITIAL_OFFERS = [
  {
    id: 'offer-1',
    code: 'AHA50',
    title: '50% Royal Welcome Fest',
    description: 'Flat 50% discount up to ₹100 on your first royal order.',
    discountPercent: 50,
    maxDiscount: 100,
    minOrder: 199,
    validUntil: '2026-12-31',
    type: 'PERCENTAGE',
    color: 'from-amber-500/20 to-amber-600/10'
  },
  {
    id: 'offer-2',
    code: 'FIRST100',
    title: 'First Feast Flat ₹100 OFF',
    description: 'Instant ₹100 cashback on orders above ₹299.',
    discountFlat: 100,
    maxDiscount: 100,
    minOrder: 299,
    validUntil: '2026-12-31',
    type: 'FLAT',
    color: 'from-purple-600/20 to-indigo-600/10'
  },
  {
    id: 'offer-3',
    code: 'WELCOME75',
    title: 'Connoisseur Privilege ₹75 OFF',
    description: 'Save flat ₹75 on select heritage restaurants.',
    discountFlat: 75,
    maxDiscount: 75,
    minOrder: 249,
    validUntil: '2026-12-31',
    type: 'FLAT',
    color: 'from-emerald-500/20 to-teal-500/10'
  },
  {
    id: 'offer-4',
    code: 'SAVE20',
    title: '20% OFF on Gourmet Palaces',
    description: 'Enjoy 20% savings up to ₹150 on AHA Select dining.',
    discountPercent: 20,
    maxDiscount: 150,
    minOrder: 399,
    validUntil: '2026-12-31',
    type: 'PERCENTAGE',
    color: 'from-amber-400/20 to-amber-700/10'
  },
  {
    id: 'offer-5',
    code: 'DUMFEAST',
    title: 'Biryani Festival Flat ₹60 OFF',
    description: 'Special weekend voucher on handi dum biryanis.',
    discountFlat: 60,
    maxDiscount: 60,
    minOrder: 349,
    validUntil: '2026-12-31',
    type: 'FLAT',
    color: 'from-rose-500/20 to-purple-600/10'
  },
  {
    id: 'offer-6',
    code: 'SWIFTFREE',
    title: 'Complimentary Express Delivery',
    description: 'Zero delivery fee on all orders above ₹299.',
    discountType: 'FREE_DELIVERY',
    maxDiscount: 40,
    minOrder: 299,
    validUntil: '2026-12-31',
    type: 'FREE_DELIVERY',
    color: 'from-blue-500/20 to-indigo-600/10'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    restaurantId: 'rest-1',
    restaurantName: 'Royal Hyderabadi Bawarchi',
    userName: 'Arjun Verma',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: '2 days ago',
    comment: 'The saffron aroma when the handi seal was unboxed took me straight to the Nizam palace banquets. Truly A Taste Above!'
  },
  {
    id: 'rev-2',
    restaurantId: 'rest-3',
    restaurantName: 'Pista House Haleem & Confectionery',
    userName: 'Priya Sundaram',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: 'Last week',
    comment: 'Without doubt the best mutton haleem in the country. Served piping hot with crunchy fried cashews and golden ghee.'
  },
  {
    id: 'rev-3',
    restaurantId: 'rest-2',
    restaurantName: 'Chutneys Royal Tiffin Temple',
    userName: 'Karthik Raja',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: '3 days ago',
    comment: 'The Babai Idlis melt in the mouth. Having seven different fresh chutneys in the packaging is unparalleled luxury.'
  },
  {
    id: 'rev-4',
    restaurantId: 'rest-7',
    restaurantName: 'Bukhara Royal Tandoor',
    userName: 'Rohit Mehra',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: '5 days ago',
    comment: 'Dal Bukhara cooked for 18 hours is worth every rupee. Superb smoky charcoal aroma and silky butter texture.'
  }
];

export const INITIAL_USER = {
  id: 'usr-101',
  name: 'Arjun Verma',
  email: 'arjun@aha.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  walletBalance: 750,
  tier: 'Royal Connoisseur',
  bio: 'Epicurean connoisseur of dum cooking, aged saffron, and royal street feasts.'
};

export const INITIAL_ADDRESSES = [
  {
    id: 'addr-1',
    title: 'Home',
    fullName: 'Arjun Verma',
    phone: '+91 98765 43210',
    flatNo: 'Flat 402, Royal Palms Residency',
    street: 'Road No 12, Banjara Hills',
    area: 'Banjara Hills',
    city: 'Hyderabad',
    pincode: '500034',
    isDefault: true
  },
  {
    id: 'addr-2',
    title: 'Work',
    fullName: 'Arjun Verma',
    phone: '+91 98765 43210',
    flatNo: 'Tower B, 7th Floor, Cyber Gateway',
    street: 'Hitech City Main Road',
    area: 'Hitech City',
    city: 'Hyderabad',
    pincode: '500081',
    isDefault: false
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'AHA-8921',
    orderId: 'AHA-8921',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    status: 'OUT_FOR_DELIVERY',
    restaurant: {
      id: 'rest-1',
      name: 'Royal Hyderabadi Bawarchi',
      coverImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80',
      address: 'Road No 1, Banjara Hills, Hyderabad'
    },
    deliveryAddress: {
      title: 'Home',
      fullName: 'Arjun Verma',
      flatNo: 'Flat 402, Royal Palms Residency',
      street: 'Road No 12, Banjara Hills',
      area: 'Banjara Hills',
      city: 'Hyderabad'
    },
    items: [
      {
        foodId: 'food-1',
        name: 'Nizami Royal Mutton Dum Biryani',
        unitPrice: 440,
        quantity: 2,
        selectedSize: { name: 'Regular Portion (Single)', price: 440 },
        selectedAddons: [{ name: 'Extra Salan & Mint Raita Gravy', price: 40 }]
      },
      {
        foodId: 'food-5',
        name: 'Royal Shahi Tukda with Rabdi',
        unitPrice: 190,
        quantity: 1,
        selectedSize: { name: '2 Pieces Platter', price: 190 }
      }
    ],
    pricing: {
      subtotal: 1110,
      deliveryFee: 0,
      tax: 55,
      platformFee: 10,
      discount: 100,
      grandTotal: 1075
    },
    paymentMethod: 'UPI',
    paymentStatus: 'COMPLETED',
    estimatedDeliveryTime: 'Within 20-25 mins',
    deliveryPartner: {
      name: 'Ravi Kumar',
      phone: '+91 99887 66554',
      vehicleNumber: 'TS 09 EZ 7788',
      rating: 4.9
    }
  },
  {
    id: 'AHA-7640',
    orderId: 'AHA-7640',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    status: 'DELIVERED',
    restaurant: {
      id: 'rest-3',
      name: 'Pista House Haleem & Confectionery',
      coverImage: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=300&q=80',
      address: 'Nayapul, Near Charminar, Hyderabad'
    },
    deliveryAddress: {
      title: 'Work',
      fullName: 'Arjun Verma',
      flatNo: 'Tower B, Cyber Gateway',
      street: 'Hitech City',
      area: 'Hitech City',
      city: 'Hyderabad'
    },
    items: [
      {
        foodId: 'food-9',
        name: 'Special Hyderabadi Mutton Haleem',
        unitPrice: 290,
        quantity: 2,
        selectedSize: { name: 'Regular Handi (500ml)', price: 290 }
      }
    ],
    pricing: {
      subtotal: 580,
      deliveryFee: 35,
      tax: 29,
      platformFee: 10,
      discount: 50,
      grandTotal: 604
    },
    paymentMethod: 'CARD',
    paymentStatus: 'COMPLETED',
    deliveryPartner: {
      name: 'Mohammed Aslam',
      phone: '+91 98480 33445',
      rating: 4.8
    }
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Order En Route!',
    message: 'Delivery partner Ravi Kumar is approaching with your royal feast #AHA-8921.',
    time: '5 mins ago',
    type: 'ORDER',
    read: false,
    link: '/orders/AHA-8921/track'
  },
  {
    id: 'notif-2',
    title: 'New Royal Voucher Unlocked',
    message: 'Code AHA50 is active! Enjoy 50% discount on first orders.',
    time: '2 hours ago',
    type: 'OFFER',
    read: false,
    link: '/offers'
  },
  {
    id: 'notif-3',
    title: 'Wallet Cashback Credited',
    message: '₹50 Royal Gold cashback has been credited to your AHA Wallet.',
    time: 'Yesterday',
    type: 'WALLET',
    read: true,
    link: '/profile'
  }
];
