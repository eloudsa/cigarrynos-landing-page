# Cigarrynos Features Documentation

## Overview

Cigarrynos is a comprehensive Flutter application for cigar enthusiasts that enables users to discover, track, review, and share their cigar experiences with a global community. The app implements a tiered access model with features available based on user authentication status, subscription level, and expertise.

## Technology Stack

- **Frontend**: Flutter (iOS, Android, Web support)
- **Backend**: Firebase (Firestore, Cloud Functions, Storage, Authentication)
- **State Management**: Riverpod
- **AI Integration**: OpenAI API for "Wainston" assistant
- **Payments**: RevenueCat for subscription management
- **Analytics**: Firebase Analytics, Sentry for error tracking

## User Types & Feature Access

### 1. Anonymous Users (Not Signed In)

Anonymous users can browse and explore the app with read-only access to public content.

#### Available Features:
- **Browse Cigar Catalog**
  - View complete cigar database
  - Access detailed cigar specifications
  - Read reviews and ratings from other users
  - Use search and filter functionality
  - Sort by date, name, ratings, price

- **AI Assistant (Wainston)**
  - Ask questions about cigars
  - Get recommendations based on preferences
  - Search cigars using natural language

- **View Public Content**
  - Browse places/lounges (if enabled)
  - View public user profiles
  - Read help documentation
  - Access privacy policy and terms of use

#### Limitations:
- Cannot write reviews or rate cigars
- Cannot save cigars to collections
- Cannot follow users or interact socially
- Cannot access personal features
- See "Sign In Required" prompts for protected features

### 2. Signed-In Users (Authenticated)

Authenticated users gain access to personal features and social interactions.

#### Personal Collection Management:
- **Humidor**
  - Track personal cigar inventory
  - Add purchase dates and quantities
  - Monitor aging progress
  - Set consumption reminders

- **Wishlist**
  - Save cigars for future purchase
  - Share wishlist with friends
  - Export to PDF for shopping
  - Track price changes

- **Favorites**
  - Mark favorite cigars
  - Mark favorite places/lounges
  - Quick access from dashboard

- **Tasted Collection**
  - Track cigars you've tried
  - Link to your reviews
  - Personal rating history

#### Social Features:
- **User Connections**
  - Follow/unfollow other users
  - Send and receive follow requests
  - View followers and following lists
  - Private/public profile settings

- **Content Sharing**
  - Share cigars via QR codes
  - Share collections and wishlists
  - Deep linking support
  - Social media integration

- **Interactions**
  - Like and comment on reviews
  - Reply to comments
  - Mention other users
  - Activity feed with updates

#### Content Creation:
- **Reviews & Ratings**
  - Write detailed cigar reviews
  - Rate cigars (1-5 stars)
  - Upload photos with reviews
  - Edit or delete own reviews

- **Place Reviews**
  - Rate cigar lounges and shops
  - Add photos of locations
  - Update opening hours
  - Report incorrect information

- **Profile Management**
  - Customize profile with bio
  - Upload profile picture
  - Display expertise badges
  - Share profile via QR code

#### Notifications:
- **Push Notifications**
  - Follow request alerts
  - New review notifications
  - Social activity updates
  - Data export ready notifications

- **In-App Notifications**
  - Notification center
  - Mark as read/unread
  - Notification history
  - Settings per notification type

#### Data & Privacy:
- **GDPR Compliance**
  - Request data export
  - Download personal data
  - Account deletion with 48-hour grace period
  - Privacy settings management

### 3. Premium/Subscribed Users

Premium users access enhanced features through monthly or yearly subscriptions.

#### Premium Features:
- **Advanced Analytics**
  - Smoking statistics and trends
  - Collection value tracking
  - Consumption patterns
  - Personal cigar journey timeline

- **Enhanced Exports**
  - Generate PDF reports for collections
  - Export wishlists with pricing
  - Custom PDF templates
  - Batch export capabilities

- **Extended Storage**
  - Unlimited photo uploads
  - High-resolution image storage
  - Video reviews (if enabled)
  - Cloud backup of collections

- **Priority Features**
  - Early access to new features
  - Priority customer support
  - Ad-free experience
  - Premium user badge

#### Subscription Management:
- **Plans Available**
  - Monthly subscription
  - Annual subscription (discounted)
  - Family plans (if available)

- **Features**
  - Subscription restoration
  - Cross-platform sync
  - Cancel anytime
  - Free trial period (if offered)

### 4. Expert Users

Expert users have special privileges for content moderation and quality control.

#### Content Moderation:
- **Cigar Management**
  - Review and approve new cigars
  - Edit any cigar information
  - Delete inappropriate content
  - Merge duplicate entries

- **Place Management**
  - Approve new places/lounges
  - Verify location information
  - Update business details
  - Remove closed locations

#### Special Permissions:
- **Visibility Control**
  - See unapproved content
  - Access moderation queue
  - View flagged content
  - Access admin dashboards

- **Editorial Rights**
  - Edit after approval
  - Override user submissions
  - Pin important content
  - Create official reviews

#### Expert Tools:
- **Moderation Dashboard**
  - Pending approvals queue
  - Flagged content review
  - User report management
  - Content statistics

- **Batch Operations**
  - Bulk approve/reject
  - Mass edit capabilities
  - Import/export tools
  - Database maintenance

## Core Features (All Users)

### Navigation & Main Screens

- **Dashboard**
  - Personalized activity feed
  - Quick actions menu
  - Recent reviews
  - Trending cigars

- **Catalog**
  - Complete cigar database
  - Advanced search and filters
  - Sort options
  - Grid/list view toggle

- **Collection** (requires sign-in)
  - Humidor management
  - Wishlist organization
  - Favorites access
  - Collection statistics

- **Settings**
  - Language selection (EN/FR)
  - Theme selection (Light/Dark/System)
  - Units and currency
  - Notification preferences

### Search & Discovery

- **Advanced Search**
  - Filter by brand, variety, strength
  - Price range selection
  - Country of origin
  - Ring gauge and length

- **AI-Powered Search**
  - Natural language queries
  - Similarity matching
  - Recommendation engine
  - "Ask Wainston" integration

### Places & Events

- **Places Directory** (feature flag controlled)
  - Cigar lounges and shops
  - Map integration
  - Opening hours
  - Contact information
  - User reviews and ratings

- **Events System** (feature flag controlled)
  - Cigar events and tastings
  - RSVP functionality
  - Event reminders
  - Social event sharing

### Technical Capabilities

- **Offline Support**
  - Cached content access
  - Offline mode detection
  - Queue for sync when online
  - Local data persistence

- **Cross-Platform**
  - iOS native app
  - Android native app
  - Web application
  - Consistent experience

- **Performance**
  - Image optimization
  - Lazy loading
  - Efficient caching
  - Fast navigation

## Feature Flags & Remote Configuration

The app uses Firebase Remote Config for dynamic feature control:

- `showPlaces`: Enable/disable places feature
- `showEvents`: Enable/disable events system
- `enableVideoReviews`: Video review capability
- `enableAIAssistant`: Wainston AI feature
- `maintenanceMode`: App maintenance toggle

## Security & Privacy

### Authentication
- Email/password authentication
- Email verification required
- Secure password reset
- Rate limiting on auth attempts
- Session management

### Data Protection
- Firestore security rules
- Encrypted data transmission
- Secure image storage
- GDPR compliance
- Privacy by design

### User Privacy
- Data export on request
- Account deletion with grace period
- Consent management
- Transparent data usage
- No third-party data sharing

## Localization

The app supports multiple languages:
- **English** (primary)
- **French** (full translation)
- Dynamic language switching
- Localized content
- Currency conversion
- Date/time formatting

## Integration Points

### External Services
- **Firebase Suite**: Backend infrastructure
- **RevenueCat**: Subscription management
- **OpenAI API**: AI assistant functionality
- **Sentry**: Error tracking and monitoring
- **Google Maps**: Location services

### Deep Linking
- Share cigars via custom URLs
- QR code generation and scanning
- Universal links support
- App-to-app communication

## Future Roadmap (Planned Features)

Based on code structure and placeholders:
- Video reviews for cigars
- Enhanced social features
- Cigar trading marketplace
- Virtual humidor tours
- AR cigar visualization
- Expanded AI capabilities

## Contact & Support

- **Support Email**: privacy@cigarrynos.app
- **In-App Support**: Settings → Privacy Policy → Message icon
- **Developer**: Noratek SRL
- **App Website**: cigarrynos.app

---

*This document provides a comprehensive overview of Cigarrynos features for integration and collaboration purposes. For the most up-to-date feature availability, please refer to the live application.*

*Last Updated: January 2025*