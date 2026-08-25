"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { registerUser } from "@/lib/store";

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signUp: (name: string, email: string, password: string) => Promise<AuthUser>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "equinox-user-v1";

function readStoredUser(): AuthUser | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

/**
 * Placeholder credential handlers backed by localStorage.
 * When Firebase is added, replace the bodies of signIn / signUp
 * with signInWithEmailAndPassword / createUserWithEmailAndPassword
 * and drive `setUser` from onAuthStateChanged.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  if (typeof window !== "undefined" && !hydrated) {
    setUser(readStoredUser());
    setHydrated(true);
  }

  const persist = useCallback((next: AuthUser | null) => {
    setUser(next);
    try {
      if (next) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // storage unavailable — session stays in memory only
    }
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        setUser(readStoredUser());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      signIn: async (email, password) => {
        await new Promise((r) => setTimeout(r, 600));
        const resolved: AuthUser = {
          name: email.split("@")[0],
          email,
        };
        void password;
        persist(resolved);
        return resolved;
      },
      signUp: async (name, email) => {
        await new Promise((r) => setTimeout(r, 800));
        const resolved: AuthUser = { name, email };
        registerUser({ name, email });
        persist(resolved);
        return resolved;
      },
      signOut: () => persist(null),
    }),
    [user, persist]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
