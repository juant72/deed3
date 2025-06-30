# Reown AppKit - Optional UI Components Guide

## Overview
This guide shows how to use Reown AppKit's built-in UI components as alternatives to custom wallet connection buttons.

## Current Implementation
The application currently uses custom connect buttons that call `connectWallet()` from the context. This works perfectly and is fully supported.

## Optional: AppKit UI Components

### 1. AppKit Connect Button
You can replace custom connect buttons with the AppKit component:

```jsx
// In any component, instead of:
<button onClick={() => connectWallet()}>
  Wallet connect
</button>

// You can use:
<appkit-button />
```

### 2. AppKit Account Button
For showing account info and disconnect options:

```jsx
<appkit-account-button />
```

### 3. AppKit Network Button
For network switching:

```jsx
<appkit-network-button />
```

### Example Usage in Header Component

```jsx
// PageComponents/Components/Header.jsx
import { useStateContext } from "../../context";

const Header = () => {
  const { currentAccount } = useStateContext();

  return (
    <header className="rn-header haeder-default header--sticky">
      {/* ... existing code ... */}
      
      {/* Option 1: Keep existing custom button */}
      {!currentAccount && (
        <button onClick={() => connectWallet()}>
          Wallet connect
        </button>
      )}
      
      {/* Option 2: Use AppKit component */}
      <appkit-button />
      
      {/* Option 3: Show account info when connected */}
      {currentAccount && <appkit-account-button />}
      
      {/* ... existing code ... */}
    </header>
  );
};
```

## Web Component Styling

AppKit components can be styled with CSS:

```css
/* Custom styling for AppKit buttons */
appkit-button {
  --w3m-color-primary: #your-brand-color;
  --w3m-color-primary-hover: #your-hover-color;
  --w3m-border-radius: 8px;
}

appkit-account-button {
  --w3m-color-bg-primary: #your-bg-color;
}
```

## Advanced: Using AppKit Hook

For more control, you can use the AppKit hook directly:

```jsx
import { useAppKit } from '@reown/appkit/react';

const CustomConnectButton = () => {
  const { open } = useAppKit();
  
  return (
    <button 
      onClick={() => open()}
      className="btn btn-primary-alta btn-small"
    >
      Connect Wallet
    </button>
  );
};
```

## React Component Wrapper

Create a React wrapper for AppKit components:

```jsx
// components/AppKitButton.jsx
import { useEffect, useRef } from 'react';

const AppKitButton = ({ variant = 'button', className = '' }) => {
  const ref = useRef();
  
  useEffect(() => {
    // Apply custom styling if needed
    if (ref.current) {
      ref.current.style.setProperty('--w3m-color-primary', '#your-color');
    }
  }, []);
  
  if (variant === 'account') {
    return <appkit-account-button ref={ref} className={className} />;
  }
  
  if (variant === 'network') {
    return <appkit-network-button ref={ref} className={className} />;
  }
  
  return <appkit-button ref={ref} className={className} />;
};

export default AppKitButton;
```

## Recommendation

The current implementation with custom buttons and context functions is perfectly fine and provides more control over the UI. The AppKit components are optional and can be adopted gradually or not at all, depending on your design requirements.

### When to Use AppKit Components:
- Quick prototyping
- Consistent Web3 UI across apps
- Less maintenance overhead

### When to Keep Custom Implementation:
- Specific design requirements
- Full control over styling
- Integration with existing component library

## Testing AppKit Components

To test AppKit components in your app:

1. Add to any page temporarily:
```jsx
<appkit-button />
<appkit-account-button />
<appkit-network-button />
```

2. Check the styling and functionality
3. Decide whether to replace existing buttons or keep current implementation

Both approaches work with the migrated Reown AppKit setup!
