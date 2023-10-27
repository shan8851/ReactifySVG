export const Checkmark = ({ className }:{ className: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <rect
        width="20"
        height="19.984"
        x="3"
        y="2"
        fill="#19BD64"
        rx="9.992"
      ></rect>
      <path
        fill="#fff"
        d="M17.8 8.915a1.223 1.223 0 00-.408-1.723c-.607-.368-1.41-.191-1.79.393l-4.1 6.28-1.604-1.55a1.098 1.098 0 00-1.596.061 1.211 1.211 0 00.059 1.663l2.23 2.157c.097.245.275.462.523.612.225.136.476.198.723.192.192.005.385-.04.559-.137.202-.099.38-.25.509-.448l4.896-7.5z"
      ></path>
    </svg>
)
