"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/portal/login" })}
      className="ml-2 text-sm text-ink-soft hover:text-ink"
    >
      Salir
    </button>
  );
}
