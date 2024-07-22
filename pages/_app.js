// pages/_app.js
import '../styles/globals.css';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <header className="p-4 bg-gray-100 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dealership Forms</h1>
        <div>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
