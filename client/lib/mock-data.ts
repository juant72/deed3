// Mock data for development without Web3 dependencies
import { RealEstateProperty, Creator, Review } from "../types/global";

export const mockProperties: RealEstateProperty[] = [
  {
    id: "1",
    title: "Modern Luxury Villa",
    category: "Housing",
    description: "Stunning 4-bedroom villa with ocean views and modern amenities. Perfect for luxury living with spacious rooms and premium finishes.",
    price: "2.5",
    location: "Miami Beach, FL",
    images: [
      "/portfolio/portfolio-01.jpg",
      "/portfolio/portfolio-02.jpg",
      "/portfolio/portfolio-03.jpg"
    ],
    owner: "0x123...abc",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2", 
    title: "Downtown Office Space",
    category: "Office",
    description: "Prime commercial office space in the heart of downtown. Modern facilities with great transportation access.",
    price: "1.8",
    location: "New York, NY",
    images: [
      "/portfolio/portfolio-04.jpg",
      "/portfolio/portfolio-05.jpg"
    ],
    owner: "0x456...def",
    isActive: true,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10")
  },
  {
    id: "3",
    title: "Cozy Country Farmhouse", 
    category: "Farmhouse",
    description: "Charming farmhouse with 10 acres of land. Perfect for those seeking peace and tranquility in nature.",
    price: "1.2",
    location: "Austin, TX",
    images: [
      "/portfolio/portfolio-06.jpg",
      "/portfolio/portfolio-07.jpg"
    ],
    owner: "0x789...ghi",
    isActive: true,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05")
  },
  {
    id: "4",
    title: "City Rental Apartment",
    category: "Rental", 
    description: "Modern 2-bedroom apartment available for rent. Great location with all amenities included.",
    price: "0.8",
    location: "San Francisco, CA",
    images: [
      "/portfolio/portfolio-08.jpg"
    ],
    owner: "0xabc...123",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "5",
    title: "Commercial Shopping Center",
    category: "Commercial",
    description: "Established shopping center with multiple retail spaces. Great investment opportunity.",
    price: "5.0",
    location: "Los Angeles, CA", 
    images: [
      "/portfolio/portfolio-09.jpg",
      "/portfolio/portfolio-10.jpg"
    ],
    owner: "0xdef...456",
    isActive: true,
    createdAt: new Date("2023-12-20"),
    updatedAt: new Date("2023-12-20")
  }
];

export const mockCreators: Creator[] = [
  {
    id: "1",
    address: "0x123...abc",
    name: "Alice Cooper",
    totalSales: 12,
    avatar: "/client/client-1.png"
  },
  {
    id: "2", 
    address: "0x456...def",
    name: "Bob Builder",
    totalSales: 8,
    avatar: "/client/client-2.png"
  },
  {
    id: "3",
    address: "0x789...ghi", 
    name: "Carol Developer",
    totalSales: 15,
    avatar: "/client/client-3.png"
  }
];

export const mockReviews: Review[] = [
  {
    id: "1",
    propertyId: "1",
    userId: "user1", 
    rating: 5,
    comment: "Amazing property with great location!",
    createdAt: new Date("2024-01-20")
  },
  {
    id: "2",
    propertyId: "1", 
    userId: "user2",
    rating: 4,
    comment: "Beautiful villa, highly recommended.",
    createdAt: new Date("2024-01-18")
  }
];

// Mock functions for development
export const mockGetAllRealEstate = async (): Promise<RealEstateProperty[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProperties;
};

export const mockGetUserProperties = async (address: string): Promise<RealEstateProperty[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProperties.filter(prop => prop.owner === address);
};

export const mockGetPropertyReviews = async (propertyId: string): Promise<Review[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockReviews.filter(review => review.propertyId === propertyId);
};

export const mockTotalReviews = async (propertyId: string): Promise<number> => {
  const reviews = await mockGetPropertyReviews(propertyId);
  return reviews.length;
};

export const mockAverageRating = async (propertyId: string): Promise<number> => {
  const reviews = await mockGetPropertyReviews(propertyId);
  if (reviews.length === 0) return 0;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};
