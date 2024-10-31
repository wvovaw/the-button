export function NotFoundPage() {
  return (
    <>
      <div className="mx-auto grid h-[calc(100vh-85px)] max-w-4xl place-content-center text-center">
        <Doodle />
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">404</h1>
        <p className="mt-4 text-muted-foreground">Page not found</p>
      </div>
    </>
  )
}

interface DoddleProps {
  width?: number
  height?: number
}
function Doodle({ width = 512, height = 428 }: DoddleProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 1024 768"
      preserveAspectRatio="none"
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <path
          className="fill-primary"
          d="M537.02 380.53l-10.353 17.567-31.932 54.168c-2.442 4.144-3.597 8.275-5.073 12.912l-8.12 25.52-12.098-6.232c-3.87-1.994-10.832-3.982-13.868-7.144-2.678-2.789-4-9.339-5.46-12.882L437.4 433.6c-6.422-15.576-12.844-31.152-19.264-46.728 19.285 1.85 38.57 3.7 57.857 5.548l61.027-11.889zm-31.702-164.06l2.51 18.065c.567 4.09.263 8.641 2.792 11.861 6.128 7.803 16.33 13.202 18.88 23.042l2.66 10.256c.34 1.314 2.112 5.072 1.646 6.35-.776 2.128-8.223 4.873-10.153 5.897-7.319 3.88-14.89 7.644-22.835 10.066-8.246 2.513-14.897 1.492-22.36-2.97-4.759-2.847-12.977-7.675-15.769-12.733-1.923-3.482-1.818-9.616-2.547-13.563h-20.355c-4.145 0-11.153-1.39-14.467.924-1.999 1.396-3.683 4.366-5.322 6.175a153.12 153.12 0 01-8.209 8.423c-6.037 5.717-12.895 11.602-20.798 14.53-9.553 3.537-18.544-1.426-26.006-7.453-3.407-2.753-11.254-8.966-11.663-13.675-.423-4.854 3.85-10.6 7.223-13.534 6.08-5.284 13.295-9.37 20.28-13.315 10.851-6.128 22.025-11.74 33.348-16.948a57306.424 57306.424 0 009.153 23.796c.631 1.643 1.226 5.171 2.47 6.425 1.455 1.467 5.23.69 7.493.69H452.4c2.4 0 7.931 1.075 10.135-.019 1.727-.858 3.61-4.412 4.802-5.87l37.981-46.42z"
        ></path>
        <g className="fill-foreground" transform="translate(73 31)">
          <path d="M856.307 317.72c-2.112-2.937-4.47-4.06-5.378.213-.995 4.682.048 10.582-.356 15.448-.976 11.748-1.367 23.552-2.658 35.272-2.371 21.522-3.855 44.417-12.014 64.706-3.903 9.703-8.316 19.297-13.637 28.307-5.314 8.997-10.61 18.813-17.147 26.97-12.268 15.303-23.171 31.978-38.247 44.736-3.657 3.095-6.912 6.633-10.834 9.413-3.316 2.351-7.055 4.134-10.232 6.444-1.566 1.138-3.11 2.021-4.758 3.072-1.571 1-2.518 2.524-4.215 3.213-1.665.676-3.744.498-5.53 1.243-2.098.877-3.96 2.255-6.053 3.142-4.14 1.754-8.746 2.145-12.93 3.882-4.083 1.693-7.704 2.775-11.975 3.95-4.864 1.336-9.785 2.094-14.688 3.264a40.063 40.063 0 00-6.254 2.035c-2.642 1.11-2.864.982-5.645.564-4.684-.704-9.41 1.462-14.164 1.341-2.382-.06-4.515-.695-6.908-.423-2.64.3-4.505.73-7.223.502a232.008 232.008 0 00-14.333-.75c-1.85-.04-3.533-.549-5.383-.456-2.814.142-3.61-.42-6.341-1.08-1.962-.475-4.181.175-6.16.07-2.333-.124-4.557-.876-6.885-1.052-4.82-.364-9.203-.98-14.022-1.756-10-1.61-20.352-4.127-29.895-7.52-4.561-1.623-8.327-3.714-12.448-6.127-3.934-2.304-8.375-2.77-12.034-5.43-7.507-5.464-16.063-9.958-23.122-16.02-7.218-6.198-15.865-10.666-22.978-16.839-3.217-2.792-6.826-5.089-9.933-7.999-3.392-3.178-6.206-6.702-9.808-9.662-7.523-6.182-13.42-14.46-20.933-20.859-7.818-6.658-14.455-14.109-21.556-21.489-2.892-3.006-5.841-5.748-9.26-8.128-3.995-2.783-1.506-5.468-.074-9.42 3.836-10.573 9.122-19.432 15.433-28.73 6.225-9.172 12.462-18.217 19.43-26.848 5.872-7.27 12.18-14.04 18.447-20.808 2.605-2.814 5.127-5.818 7.902-8.484 2.144-2.059 2.435-1.943 5.108-1.294 2.43.591 4.758.81 7.034 1.905 4.418 2.128 8.234 5.096 13.116 6.237 5.212 1.217 9.727 3.078 14.827 4.615 9.414 2.84 19.626 5.92 27.984 11.27 8.795 5.632 15.156 14.524 21.433 22.641 6.568 8.49 11.11 18.293 16.37 27.655 5.44 9.681 10.51 19.506 16.397 28.932 10.78 17.261 24.909 32.211 45.14 37.222 8.848 2.191 19.909 4.964 28.536.633 3.776-1.895 7.026-4.703 10.76-6.692 4.348-2.315 8.756-4.31 12.469-7.62 7.26-6.475 15.137-12.198 22.127-19.02 6.447-6.294 12.075-13.456 18.095-20.174 3.003-3.35 5.467-7.175 8-10.884 1.26-1.844 2.146-3.98 3.39-5.788 1.14-1.653 2.736-2.724 3.972-4.302 2.47-3.15 4.35-7.096 6.615-10.443 2.863-4.232 5.13-8.768 6.964-13.532 3.832-9.96 5.255-19.455 6.137-30.017 3.093 2.563 11.437 2.682 13.393-1.15 3.17-6.212-3.604-7.2-7.136-9.974-2.41-1.892-3.997-4.554-5.763-7-1.196-1.658-4.528-4.354-4.976-6.364-.672-3.02 2.686-6.082 4.234-8.359 2.168-3.189 4.179-6.487 6.302-9.707 8.16-12.38 16.839-24.665 26.829-35.655 4.45-4.897 9.177-10.01 14.598-13.826 4.815-3.389 9.54-10.007 15.514-11.202-3.36 5.167-12.621 15.933-6.156 22.437 5.294 5.325 15.737-6.582 22.294-5.633-3.685 5.268-10.082 13.903-5.296 20.647 4.104 5.785 11.632-3.703 16.675-3.703l-10.187 20.238m-441.451 79.371c-3.186-.215-6.735 1.801-6.362 5.346.359 3.432 4.377 3.696 4.813 6.734.413 2.87-3.042 8.36-4.031 11.125-.607 1.695-1.631 8.445-3.627 9.182-2.75 1.015-6.864-4.389-9.502-1.948-2.091 1.933.316 6.362 1.546 8.026 1.95 2.64 6.15 2.903 7.25 5.848.99 2.653-.062 8.062-.062 10.921-3.51-1.84-5.79-2.723-7.32-6.456-1.443-3.524-2.021-2.826-5.424-4.795-2.86-1.656-4.456-4.733-6.421-7.28-2.095-2.716-5.08-5.514-5.675-9.045 4.922 0 9.816.237 12.87-4.429 2.73-4.175-.082-7.322-4.641-6.719-2.545.337-9.405 4.465-11.665 3.111-1.276-.765-1.533-3.447-1.975-4.759-1.061-3.15-2.271-6.232-3.251-9.415a179.553 179.553 0 01-2.53-9.145c-.434-1.73-2.413-6.212-1.437-7.726 1.883-2.918 6.753-.124 7.033-5.65.296-5.843-5.436-5.829-9.36-5.575-5.11.33-7.646-6.64-10.21-10.309 6.76 1.1 13.334 3.04 20.128 4.003 5.516.781 11.03-1.738 13.258 4.604.793 2.256 3.653 9.6 7.412 5.854 2.215-2.207-.49-7.182-1.517-9.468 10.944-2.033 22.1-1.584 33.054-4.109 5.218-1.202 10.028-3.505 15.127-5.08 3.986-1.233 8.588-3.98 12.693-4.38-.96 3.218-5.113 5.866-7.312 8.278-3.336 3.66-6.527 7.448-9.741 11.214-1.711-2.818-3.95-8.042-7.441-9.026-5.187-1.462-5.566 5.463-4.362 8.746.834 2.276 2.239 3.566 3.779 5.298 2.607 2.937.873 3.892-1.587 6.906-2.056 2.52-3.85 5.106-5.75 7.732-2.924 4.04-3.442 2.677-7.76 2.386M358.393 436.3c-10.064-1.649-20.821-2.016-31.015-2.61-9.538-.556-19.364-.729-28.928-.443-9.523.284-19.26-.64-28.732.497-8.823 1.06-17.738-1.018-26.736-1.397-3.784-.159-7.614.85-11.4.395-1.9-.228-3.574-.905-5.52-.874-2.758.045-5.418.812-8.198.8-10.018-.05-21.1-2.445-30.94.651-4.26 1.34-8.258.735-12.612 1.78-4.214 1.012-8.26 2.477-12.436 3.556-8.525 2.204-16.357 5.137-24.486 8.74-15.814 7.01-31.185 18.945-38.325 35.136-4.052 9.19-5.94 19.83-4.348 29.772 1.53 9.565 2.819 20.003 7.985 28.375 9.627 15.601 19.917 31.84 36.046 41.413 7.976 4.734 15.1 10.877 23.05 15.545 3.483 2.044 7.577 2.562 10.985 4.677 3.01 1.87 6.048 4.001 9 5.991 3.46 2.334 5.798 4.678 4.52 9.06-1.268 4.357-4.647 8.732-7.312 12.34-6.473 8.76-12.964 17.711-19.677 26.277-3.571 4.557-7.993 8.108-12.51 11.681-2.974 2.355-7.693 4.617-9.923 7.714-1.476 2.05-.37 3.37-1.198 5.328-.768 1.813-2.633 2.44-4.293 3.344-5.33 2.903-10.392 3.65-16.095 5.363 2.178-5.645 5.003-11.5 4.115-17.73-.73-5.104-3.336-7.319-7.984-4.61-4.885 2.845-9.556 6.253-14.487 8.993-4.957 2.756-11.242 4.005-16.68 5.521 2.47-5.124 5.459-10.489 4.085-16.383-1.27-5.447-4.155-6.538-8.58-3.55-9.452 6.384-24.47 9.637-35.635 6.752 1.702-5.862 7.732-10.808 11.679-15.213 4.674-5.218 9.419-10.356 14.548-15.133 4.842-4.51 9.364-9.05 13.778-13.963.68-.757 1.206-1.859 2.195-2.288 1.067-.462 2.636.435 3.496-.333 1.595-1.423-.64-3.466-1.601-4.777 3.056-.722 6.527 2.774 9.346.786 4.517-3.188.263-10.594-2.4-13.248-7.533-7.509-16.423-13.253-23.358-21.48-7.5-8.9-16.02-17.036-23.22-26.168-6.556-8.315-13.924-17.042-17.99-26.892-4.396-10.65-6.621-21.209-5.361-32.729 1.29-11.796 3.853-23.549 6.22-35.166 2.01-9.852 7.87-19.288 13.617-27.419 5.504-7.789 10.875-16.95 17.558-23.76 3.29-3.354 7.528-5.54 10.923-8.764 3.876-3.68 6.707-6.12 11.522-8.585 4.724-2.417 9.31-5.105 14.02-7.55 4.685-2.434 9.202-4.343 13.998-6.459 4.042-1.783 8.02-2.43 12.168-4.06 5.369-2.11 10.852-3.882 16.497-5.095 9.804-2.106 19.397-4.677 29.16-6.703 4.626-.96 9.458-.934 13.987-1.977 4.878-1.124 9.447-1.347 14.39-2.15 4.452-.723 8.883-.705 13.382-1.302 2.657-.352 5.337.074 7.987-.247 3.26-.394 5.553-1.07 8.865-.888 4.52.25 8.117-2.247 12.458-1.597 4.146.621 8.088-.504 12.193-1.207 2.17-.372 3.834.251 5.989.315 2.932.088 5.932-.539 8.896-.565 6.062-.054 12.165-.4 18.224-.258 12.098.286 23.969.266 36.072 2.03 2.88.42 5.753 1.67 8.583 2.005 2.33.277 3.475-.275 5.837.792 4.646 2.1 7.808 7.773 10.23 12.092 6.12 10.917 7.99 23.952 11.622 35.794 3.749 12.226 8.707 22.595 15.768 33.172-4.4-.779-8.603-2.392-13.014-3.114m-48.937-134.048c-4.055-8.353-6.278-17.422-9.667-26.038 3.612-.55 7.517.916 11.175 1.031 4.414.141 8.316-.066 12.642-1.057 8.022-1.839 17.033-5.168 23.399-10.535 3.145-2.65 5.5-5.93 7.052-9.727.954-2.337 1.534-4.724 2.007-7.186.118-.615.083-3.627.598-4.083 1.154-1.024 6.859-1.222 8.449-1.098 4.357.342 8.736.92 13.17 1.208 3.436.224 6.953-.269 8.273 3.371 1.15 3.17.685 7 1.754 10.3 2.329 7.197 7.989 14.542 15.076 17.526 7.067 2.975 18.07 3.568 25.525 2.55 9.09-1.244 15.67-7.043 22.506-12.476 0 17.86-.598 35.336 4.664 52.691 1.185 3.912 2.625 7.773 4.453 11.433.835 1.671 4.9 6.425 4.496 8.191-.444 1.937-8.081 3.95-9.881 4.561-4.398 1.494-8.836 2.926-13.258 4.346-7.883 2.532-16.457 4.614-24.696 5.186-8.04.558-15.954.368-23.995.541-8.023.172-15.13-.814-22.991-2.625-8.88-2.044-18.216-3.06-26.98-5.419-7.658-2.06-12.607-10.386-17.305-16.246-6.537-8.156-11.903-17.048-16.466-26.445m-11.311-44.677c-1.552 1.257-7.99-1.428-9.332-2.467-1.858-1.439-2.23-6.604.43-7.946 2.538-1.28 10.86 2.934 7.045-4.403-.86-1.653-2.137-1.592-1.365-3.612.443-1.157 3.354-2.972 4.413-3.37 4.385-1.65 4.905 3.142 8.666 4.704 3.81 1.582 8.2.507 12.125 2.066 1.5.595 2.26 1.732 3.515.142.62-.789.326-2.879.089-3.773-1.156-4.339-7.17-7.069-10.465-9.588 8.356-4.232 16.147-8.234 23.526-14.055.55 1.504 2.107 3.905 1.056 5.52-.593.91-3.686 1.963-4.637 2.831-2.885 2.636-6.774 8.585-3.718 12.54 3.708 4.797 12.554-3.542 15.085-6.402 4.539 4.561 4.226 14.968.724 19.855-.566-4.057-8.233-10.402-11.635-5.649-4.81 6.724 7.447 7.971 11.017 7.144-2.005 3.232-5.793 8.37-9.864 8.938-3.854.54-5.643-4.518-7.931-7.015-1.987-2.168-6.311-7.245-8.378-2.895-2.047 4.311 2.499 9.171 4.73 12.352-3.096.401-6.07 1.822-9.248 1.493-1.518-.157-5.126-.344-6.398-.813-3.923-1.446-3.06-7.488-2.082-10.727.995-3.29 2.028-8.919-3.786-6.534-6.18 2.534-.296 9.001-3.582 11.664m48.734-55.693c2.608-4.322 4.729-8.982 6.325-13.769 1.584-4.752 1.515-8.6 6.195-10.93 8.446-4.204 18.318-8.838 24.523-16.202 2.41-2.86 3.528-7.322 6.92-9.064 4.177-2.144 9.818-3.217 14.302-4.815 5.248-1.87 10.765-2.847 15.914-4.988 3.643-1.515 8.635-4.425 12.563-4.747-.26 3.872-1.02 7.851-.444 11.733.387 2.616 3.687 6.143 3.392 8.273-.142 1.022-1.68 1.446-2.275 2.301-.735 1.058-.767 2.533-1.02 3.736-.835 3.986-1.416 7.981-2.801 11.84-5.798 16.143-21.437 27.066-31.977 39.987a106.946 106.946 0 00-7.746 10.847c-1.492 2.381-2.867 6.728-5.697 7.831-3.4 1.325-10.028-.777-13.533-.99-3.444-.21-6.237 1.008-9.565.773-3.45-.245-5.996 1.313-7.612-2.282-1.297-2.886-1.396-6.48-2.413-9.499-2.16-6.41-9.271-13.039-5.051-20.035m25.48-82.358c-4.85.156-9.225-2.093-13.255-4.543 8.252-3.33 16.695-2.835 24.985-.348-3.242 2.912-7.346 4.75-11.73 4.891M353.08 97.29c2.03-7.476 7.874-16.1 13.433-21.387.94 4.592 4.429 3.747 7.652 5.27 2.754 1.3 3.097 3.94 6.33 4.733 2.413.592 6.46.94 8.383-1.042 3.16-3.258-.49-5.254-3.05-6.67a135.658 135.658 0 016.233-7.722c1.495-1.728 4.4-4.135 4.498-6.654.15-3.87-2.941-2.228-5.244-1.034-1.09.565-2.61 1.887-3.842 2.108-1.182.211-2.346-.572-3.41-.276-2.574.717-7.371 9.287-11.108 5.316-1.551-1.648 1.765-6.854 2.718-8.215 3.21-4.585 9.425-3.004 14.443-3.398 5.48-.43 10.969-1.553 16.449-1.845 6.128-.326 8.839 4.774 13.135 8.61 4.083 3.646 10.253 7.651 15.53 9.338 5.049 1.613 7.38.411 7.58 6.65.445 13.788 15.834 6.693 24.619 8.083 5.13.811 5.974 3.866 1.69 6.99-2.19 1.596-4.755 2.181-7.355 2.61-3.302.545-4.586 1.297-7.398 3.18-9.254 6.191-24.506 9.523-35.26 6.651-5.942-1.587-12.028-4.527-17-8.138-4.291-3.116-8.228-6.926-13.176-9.016-5.994-2.53-11.69-.572-17.89-.62-7.817-.064-12.02 1.393-17.96 6.478m88.9 44.795c.85-2.474 6.095-15.735 9.912-14.119.97.411 2.77 5.73 3.49 6.7 2.315 3.12 5.614 5.48 8.878 7.502-5.42 4.506-13.105 5.631-19.153 9.094-6.611 3.784-4.382-5.526-3.126-9.177m-19.64 119.14a494.414 494.414 0 00-9.42-.752c-2.797-.2-5.968-1.249-8.681-1.265-2.335-.014-3.928 1.614-6.145.16-1.87-1.228-2.512-4.343-3.413-6.212 4.425.246 13.155 3.95 16.724-.108 2.488-2.83.25-7.132-2.468-8.807-5.091-3.139-9.116-.433-14.02 1.211.048-5.987 3.079-8.8 6.834-12.908 4.023-4.398 8.304-8.927 11.773-13.779 2.926 2.396 10.024 8.397 13.525 3.68 3.527-4.752-3.5-9.054-6.825-10.865l8.28-11.459c.958 5.506.71 11.016 3.038 16.211 2.129 4.75 5.099 9.677 9.089 13.072-3.752 2.275-7.504 8.71-3.571 12.44 2.219 2.104 4.239 1.283 6.49-.179 3.022-1.963 3.74-3.082 7.15-1.385 1.497.744 3.99 1.858 3.618 3.63-.308 1.47-4.483 4.08-5.584 5.114-5.033 4.734-10.69 8.41-16.522 12.075-.89-2.97-1.77-11.92-6.336-11.478-4.42.43-3.535 8.591-3.535 11.603m74.333-117.949c34.192-8.957 67.988-18.3 102.79-24.832 8.446-1.585 16.957-2.784 25.398-4.379 8.322-1.573 16.804-2.082 25.099-3.647 16.706-3.15 33.46-5.307 50.436-6.816 16.57-1.474 32.856-2.07 49.359.72 6.859 1.16 14.157.716 20.819 2.497 3.364.9 7.146 1.681 10.273 3.23 3.484 1.725 6.448 4.61 9.72 6.716 6.618 4.258 10.725 8.744 14.995 15.328 4.514 6.962 4.9 15.473 5.09 23.701.187 8.175-2.026 16.111-4.43 23.845-2.458 7.91-3.55 16.677-7.13 24.167-.847 1.771-4.314 8.666-7.22 7.8-1.861-.557-1.684-3.61-1.802-5.202-.367-4.94-.945-17.234-9.295-11.887-3.232 2.07-5.69 5.986-8.103 8.878-2.997 3.59-6.001 7.174-9.027 10.74-5.274 6.211-10.49 15.004-18.004 18.69.56-3.724 9.794-40.75-1.755-36.52-2.097.768-3.926 3.707-5.298 5.378-2.586 3.151-5.054 6.394-7.484 9.666-4.298 5.787-8.506 11.636-12.685 17.51-3.9 5.48-8.318 10.615-13.111 15.341-2.66 2.623-13.355 12.942-14.222 3.362-.175-1.932.745-4.198 1.1-6.083.72-3.807 1.163-7.674 1.83-11.49 1.366-7.82 3.266-15.497 5.3-23.163 1.997-7.518 3.424-14.958 3.5-22.75.078-7.71.32-16.04-3.842-22.873-3.084-5.059-8.414-10.799-13.655-13.48-7.106-3.635-14.118-3.44-21.817-4.518-15.254-2.135-31.448.071-46.59 2.402-14.217 2.19-27.751 6.53-41.59 9.832-15.563 3.715-30.4 9.541-45.415 14.43-16.557 5.388-33.106 11.142-49.35 17.453.798-2.81.714-5.67 1.32-8.483.479-2.223 1.743-3.135 2.703-5.057 2.025-4.054 1.069-9.976-4.368-9.842-4.53.111-9.68 3.802-13.306 6.141-3.698 2.385-11.644 6.096-13.851 10.194-5.935 11.021 17.43 5.697 13.354 14.67-1.12 2.464-2.587 2.262-2.298 5.51.32 3.61.198 5.311-1.026 8.895-2.163 6.334-3.143 13.018-5.412 19.301-6.16-7.443-17.4-15.915-18.71-26.077-1.398-10.84 4.017-21.128 6.64-31.323 1.049-4.073.205-9.586 1.85-13.319 1.88-4.265 9.149-4.148 13.095-4.964 12.168-2.518 24.104-6.543 36.125-9.692M877.8 290.166c-.627-4.547-4.215-7.556-8.485-8.466-4.206-.896-2.16-1.367-2.017-5.913.129-4.063-.658-9.032-4.394-11.354-3.382-2.1-7.842-1.372-11.62-1.537 2.626-7.584 5.232-19.249-6.401-17.203-9.398 1.653-16.416 7.96-24.01 13.486-7.763 5.651-14.472 10.974-21.018 18.005-6.575 7.064-12.792 14.468-18.334 22.375-5.543 7.908-10.334 16.281-14.2 25.132-3.636 8.33-6.921 16.37-5.024 25.585.984 4.778 3.269 9.214 4.073 14.023.83 4.955-.267 9.966-1.655 14.716-2.653 9.078-7.297 17.057-12.554 24.842-4.45 6.59-8.323 13.132-13.747 18.941-6.77 7.251-13.393 14.493-20.472 21.468-5.594 5.51-12.384 11.11-18.828 15.622-3.91 2.737-8.597 3.981-12.834 6.085-3.955 1.965-7.308 3.982-11.604 5.188-4.343 1.22-8.897 3.341-13.47 3.243-4.6-.099-9.575-2.348-13.964-3.675-9.152-2.767-16.15-5.45-22.697-12.654-13.87-15.26-23.008-34.644-33.266-52.482-9.342-16.247-20.36-34.419-35.508-45.98-7.243-5.529-15.788-9.474-24.143-12.985-4.11-1.728-8.588-2.345-12.858-3.549-3.817-1.077-7.853-1.054-11.424-2.545-4.3-1.794-8.378-5.043-13.138-5.574-1.53-.17-2.765.414-4.245-.089-1.811-.616-3.492-2.57-5.391-3.406-8.715-3.835-13.691-7.633-17.682-16.445-4.146-9.157-6.87-18.855-6.468-28.983.197-4.97.905-9.984 1.8-14.874.84-4.586.935-9.456 2.015-13.929.464-1.922 1.42-3.703 1.832-5.646.38-1.793.058-3.906.788-5.604.638-1.485 1.838-1.973 2.655-3.239 1.46-2.258.358-3.628.108-5.97-.452-4.259 1.46-8.889 2.28-13.046 1.025-5.193 2.585-10.222 3.768-15.37.742-3.226.694-6.822 3.576-8.945 3.097-2.283 8.968-2.528 12.667-3.489 10.108-2.628 20.149-5.424 30.258-8.036a112.2 112.2 0 0014.138-4.658c2.713-1.099 3.762-.724 6.514-.998 2.074-.206 3.786-1.477 5.748-2.007 4.078-1.1 6.433 1.092 9.936 2.715 3.979 1.843 9.138 2.653 13.46 3.273 8.836 1.268 19.66-.196 28.445-1.725 9.888-1.722 19.89-4.572 28.49-9.736 1.694-1.017 2.996-2.193 4.919-1.72 1.548.378 2.88 2.49 4.164 3.394 3.886 2.737 8.625 3.475 13.056 1.64 3.604-1.493 6.009-4.18 7.622-7.679 1.233-2.674 1.723-6.782 4.774-8.046 3.037-1.258 9.408.232 12.618.85 4.096.787 7.36 3.16 10.472 5.925 6.892 6.13 7.709 14.204 6.35 22.874-3.188 20.358-11.333 39.852-10.881 60.782.17 7.996 3.486 15.454 13.028 14.513 4.699-.463 7.472-3.832 10.98-6.542 3.933-3.036 7.405-6.182 10.709-9.906 6.972-7.853 12.959-16.463 19.29-24.822.74 7.618-3.238 15.187 1.664 22.225 4.017 5.768 9.66 1.771 13.474-2.039 5.686-5.677 10.9-12.058 16.014-18.25 4.104-4.974 8.308-13.11 13.877-16.489-.183 6.314 4.044 17.124 11.96 14.296 7.308-2.61 12.152-12.92 15.285-19.377 1.89-3.896 3.582-7.885 5.4-11.814 2.064-4.454 2.429-8.305 3.399-13.009a541.602 541.602 0 004.954-27.479c1.468-9.602-.118-17.976-3.416-26.975-1.388-3.784-1.663-7.378-4.078-10.77-2.515-3.532-5.8-7.04-8.981-9.982-6.675-6.17-15.348-8.34-23.4-12.022-4.41-2.016-8.172-2.199-12.846-2.837-4.44-.605-8.676-1.767-13.18-2.019-11.528-.645-22.94-2.922-34.528-2.212-5.386.331-10.8.645-16.19.843-4.31.158-10.398 1.444-14.544.21 2.162-4.525 6.66-8.227 6.488-13.632-.164-5.173-4.473-7.783-8.94-9.124-5.99-1.798-12.685-2.839-18.943-2.603-5.218.196-12.446 2.32-17.327-.426 3.228-4.38 6.8-9.087 7.536-14.648.97-7.34-4.942-11.306-11.002-14.014-6.26-2.797-13.732-3.554-20.442-4.548-6.848-1.016-13.523-1.609-20.394-.787-13.748 1.646-27.497 3.347-41.281 5.292-12.871 1.817-27.22 5.002-40.074 1.74-13.605-3.456-8.828-15.304-14.467-25.014C505.727-.284 489.998-.502 479.15.264c-13.293.94-28.866 6.482-40.428 12.991-2.373 1.336-4.894 2.388-7.212 3.771-2.355 1.404-4.126 3.467-6.854 4.271-6.401 1.885-13.832-1.875-20.333-2.032-14.06-.338-30.612 6.585-40.61 16.524-6.397 6.361-14.92 25.655-4.022 32.15-4.721 4.955-8.147 10.94-10.801 17.212-1.33 3.14-2.453 6.365-3.5 9.61-.75 2.326-1.147 6.151-2.88 8.016-1.694 1.826-4.081 2.935-5.821 4.935-2.28 2.622-4.396 5.362-6.174 8.352-2.933 4.928-5.457 10.687-6.195 16.417-.678 5.253.432 10.458 4.687 13.954 2.425 1.993 5.469 3.118 8.58 3.345 3.396.248 6.898-1.483 10.194-1.106 2.707.31 2.416 1.7 4.132 3.554 1.955 2.11 4.952 3.193 7.698 3.783 2.546.547 5.213.656 7.766.088 3.287-.73 6.1-3.148 9.493-3.363-5.063 4.635-10.423 8.951-16.124 12.78-6.212 4.173-12.112 5.533-19.323 7.074-14.245 3.044-27.804 7.623-42.355 9.22-6.917.76-13.696 2.285-20.658 2.846-8.531.687-17.071.675-25.621.54-6.606-.104-13.322-.01-19.836-1.247-7.003-1.33-14.251-.895-21.393-.864-7.328.031-14.616-.095-21.914-.828-6.946-.698-13.708-4.308-20.348-6.414-13.635-4.326-26.207-11.395-37.334-20.29-5.375-4.298-11.308-8.065-16.057-13.088-4.31-4.558-8.393-10.003-12.26-14.963-8.438-10.828-10.941-24.718-17.575-36.428-3.453-6.095-10.9-21.909-18.254-10.507-4.263 6.61-4.904 15.117-6.558 22.613-3.395-6.186-6.656-12.469-10.217-18.562-1.678-2.872-4.508-8.086-8.623-6.663-3.942 1.364-5.787 9.128-6.646 12.601-1.672 6.757-1.73 13.84-4.654 20.277-2.287-4.748-3.945-10.68-9.187-13.009-6.42-2.85-12.772.17-15.978 5.99-7.905 14.346-6.536 32.968-3.861 48.49 5.229 30.343 19.559 60.011 42.72 80.74 5.517 4.938 11.933 8.712 17.956 12.974 2.42 1.713 4.587 3.232 7.515 3.895 3.7.837 5.386 3.028 8.896 4.581 13.106 5.8 27.84 6.338 41.27 10.831 3.139 1.05 6.398.405 9.496 1.451 3.413 1.152 5.754 1.32 9.269 1.887 7.22 1.167 14.897 3.134 22.309 3.273 7.415.138 14.595 1.097 22.064 1.506 7.695.421 14.853-.018 22.52-.95 16.637-2.026 34.68-2.485 50.053-9.633 5.985-2.783 10.928-6.353 15.385-11.235 1.24-1.359 4.718-5.003 3.357-7.2-1.484-2.394-4.762-.142-6.716.717-15.245 6.701-31.985 8.47-48.452 9.824-7.7.633-15.508 1.757-23.227 1.96-3.98.105-7.473-.302-11.316-1.105-4.401-.92-8.843-.519-13.282-1.027-7.712-.882-15.367-2.272-23.055-3.215-6.451-.79-13.665.265-19.507-2.683-5.444-2.746-11.971-3.217-17.843-5.132-6.92-2.257-14.066-3.493-20.865-6.246-3.386-1.37-6.79-2.059-10.171-3.182-2.731-.907-5.045-3.129-7.785-4.362-6.43-2.892-12.292-8.225-17.238-13.19-11.07-11.11-20.388-24.355-27.706-38.273-4.052-7.707-6.368-17.226-9.116-25.495-2.558-7.698-4.808-16.297-6.143-24.295-.475-2.843-3.832-17.226.846-17.343 6.463-.16 10.607 11.3 12.404 15.803 2.705 6.778 6.085 16.164 11.694 21.153 5.244 4.664 8.306-4.207 8.226-8.344-.058-3.005-1.176-4.33-2.811-6.707-2.31-3.358-3.103-6.03-3.29-10.195-.427-9.53 1.336-18.976 2.963-28.319 3.912 6.885 8.072 13.523 10.785 21 1.417 3.904 3.528 15.38 9.832 13.481 3.88-1.168 5.44-6.994 6.004-10.473 1.26-7.762.444-15.594 2.61-23.27 2.719 1.3 4.033 6.596 5.223 9.127 2.384 5.064 4.153 10.145 5.815 15.477 3.189 10.238 9.41 18.784 15.598 27.404 6.26 8.723 13.723 16.15 22.292 22.618 8.359 6.308 18.11 13.35 27.988 16.99 5.078 1.872 10.338 3.126 15.395 5.084 2.28.883 4.546 1.826 6.862 2.616 3.132 1.067 6.205 1.065 9.295 1.864 4.945 1.28 9.07 2.48 14.272 2.634 5.05.15 10.117.04 15.147.447 10.328.838 21.15 1.011 31.533 1.007 11.704-.004 23.642.226 35.158-2.095 11.749-2.367 23.723-3.998 35.31-6.899 13.237-3.314 26.358-7.309 39.523-10.909-5.714 10.351-16.017 21.101-26.518 26.512-5.233 2.696-10.637 5.841-16.104 7.965-5.967 2.32-11.87 3.985-17.47 7.194-6.072 3.478-8.176 6.797-11.084 12.946-2.91 6.154-4.916 12.067-4.152 19.044.59 5.386 2.829 11.144 6.798 14.95a17.864 17.864 0 007.274 4.21c3.072.907 4.186.26 4.974 3.392.522 2.073-.074 5.017.268 7.274.474 3.122 1.247 6.2 2.043 9.251 1.818 6.976 3.79 13.99 6.947 20.496 2.593 5.341 5.924 10.257 9.477 14.998 1.354 1.808 3.954 4.008 4.77 6.117.575 1.481-.164 5.254-1.927 6.147-.932.472-5.631-1.47-6.304-1.63-2.763-.662-5.362-1.193-7.992-2.132-6.318-2.255-13.898-2.399-20.62-3.132-5.912-.643-11.93-1.446-17.886-1.222-2.773.105-5.508 1.09-8.221 1.171-2.897.088-5.493-.593-8.445-.424-2.71.156-3.667.13-6.27.95-2.764.872-4.094-.045-6.836-.319-3.19-.319-6.087 1.194-9.24 1.222-3.037.027-6.014-.275-9.091-.157-5.611.213-11.423 1.4-16.903 1.311-3.244-.054-5.432.43-8.582 1.082-3.523.73-7.165-.469-10.623.528-4.82 1.39-9.967 1.4-15.058 2.45-5.56 1.146-10.914 2.915-16.535 3.764-12.027 1.816-23.968 5.557-35.511 9.38-49.603 16.427-90.604 60.6-99.918 112.63-2.69 15.03-6.483 31.948-4.763 47.232 1.647 14.648 7.365 29.581 15.023 42.097 7.486 12.234 16.725 23.871 26.9 33.96 5.047 5.004 9.856 10.37 15.443 14.785 2.329 1.841 4.38 4.206 6.773 5.92 2.86 2.048 6.53 3.016 9.754 4.333-11.833 6.684-23.125 15.207-32.904 24.656-8.467 8.18-19.456 19.884-18.238 32.698 1.68 17.694 25.817 11.98 37.184 9.533 0 8.473.068 18.647 11.479 17.666 4.774-.41 10.487-2.424 14.636-4.795 3.749-2.14 6.165-3.033 10.455-4.02 0 4.078-.922 9.945 2.386 13.101 3.592 3.426 10.229 3.186 14.594 1.896 10.028-2.963 20.83-6.184 27.353-15.088 3.17-4.328 6.119-9.09 8.039-14.123.91-2.388.939-5.508 2.51-7.55 1.464-1.9 4.194-3.184 5.984-4.764 3.886-3.43 7.136-7.534 10.513-11.443 4.04-4.676 8.558-8.966 12.248-13.937 6.665-8.974 11.4-20.378 9.083-31.7-2.166-10.58-10.916-20.407-21.251-22.836-4.876-1.146-7.96-5.087-11.78-7.993-4.142-3.152-8.843-6.294-13.267-9.017-4.76-2.93-9.756-6.176-14.17-9.604-4.427-3.44-7.817-8.506-11.283-12.87-7.215-9.08-15.447-18.537-17.803-30.188-.944-4.668-2.286-9.743-.784-14.393 1.589-4.919 5.089-8.873 8.28-12.8 6.99-8.6 17.025-13.699 27.02-17.96 5.41-2.307 10.765-4.184 16.247-5.936 1.958-.626 3.488-1.875 5.525-2.37 2.847-.694 5.883-.957 8.768-1.614 5.506-1.253 10.332-2.644 15.99-2.689 6.47-.052 12.928-.549 19.362-1.208 5.62-.575 10.446.246 15.98.372 2.386.054 4.817-.395 7.2-.269 2.92.154 5.67.947 8.642 1.004 4.836.09 9.337.591 14.069-.064 2.35-.326 4.349.371 6.72.14.58-.057 1.14-.804 1.686-.817 1.078-.024 1.674.524 2.774.651 11.47 1.325 22.923-1.013 34.38-.505 11.209.497 22.88-.192 34.117-.84 11.123-.644 23.674-1.78 34.015-6.279 3.849-1.675 6.272-5.823 9.976-2.998 4.672 3.563 8.453 7.902 13.606 10.994 4.415 2.65 9.874 3.48 14.8 4.744 2.325.597 5.153 1.858 7.563 1.451 3.082-.522 2.763-2.03 4.923.913 3.199 4.362 5.254 9.448 8.669 13.74 3.613 4.54 7.65 9.06 11.825 13.093 7.716 7.453 15.053 15.375 22.678 23.002 3.929 3.93 6.37 8.865 10.467 12.607 3.854 3.52 7.568 7.32 11.509 10.725 9.059 7.833 19.01 14.763 28.565 21.978 4.604 3.477 8.628 7.467 13.672 10.344 4.88 2.784 10.093 5.333 14.73 8.376 9.099 5.967 19.71 9.688 30.162 13.177 5.6 1.87 11.279 3.42 17.092 4.464 5.313.954 10.336 1.31 15.627 1.944 4.873.585 9.798.775 14.635 1.422 2.854.382 3.618-.073 6.113-.447 2.239-.336 3.903.837 6.226.955 10.603.538 21.462 1.383 32.168.456 5.554-.482 10.499-.125 15.845-1.912 5.308-1.776 11.009-1.228 16.373-3.14 10.355-3.692 21.209-5.719 31.28-10.44 4.226-1.98 9.645-3.329 13.38-6.17 1.544-1.174 2.547-2.573 4.118-3.532 2.059-1.256 4.928-2.545 7.202-3.49 4.129-1.717 6.929-4.892 10.552-7.529 4.672-3.4 9.298-6.738 13.379-10.864 7.518-7.602 14.8-15.077 21.33-23.653 14.807-19.449 27.734-40.486 39.138-62.102 12.419-23.54 17.359-48.303 19.648-74.623 1.137-13.062 2.085-26.173 2.963-39.255.408-6.097.756-12.237.496-18.348-.11-2.598-.94-6.096-.025-8.64.874-2.427 3.459-4.267 5.098-6.168 6.229-7.22 16.11-19.977 14.712-30.119"></path>
          <path d="M388.546 390.376c-3.147-1.775 1.208-6.766-2.295-8.031-3.172-1.145-5.029 4.328-5.362 6.482-.696 4.503 1.012 8.629 4.942 10.82 2.066 1.153 4.473 1.77 6.376 3.233 2.06 1.585 3.076 3.775 5.285 5.227 3.853-7.971-2.627-14.167-8.946-17.731"></path>
          <path d="M411.299 375.084c-5.923 1.395-6.953 17.718-.522 17.443 3.793-.162 2.729-7.801 3.323-10.405.579-2.542 1.748-8.11-2.801-7.038"></path>
          <path d="M407.895 88.744c7.648 5.074 20.055-7.948 16.13-15.73-3.11 1.86-7.648 7.37-11.486 6.975-5.985-.615.16-6.423-.662-9.21-1.553-5.27-5.896 3.588-6.392 5.242-1.153 3.848-1.491 10.135 2.41 12.723"></path>
          <path d="M427.235 243.12c-.124-2.998-.97-6.086-3.188-8.215-2.217-2.129-4.812-2.635-6.486-5.319-1.06-1.7-1.084-3.397-3.304-1.637-1.417 1.123-1.848 4.291-1.824 5.958.035 2.507 1.039 4.872 2.676 6.752 1.906 2.19 4.6 2.514 6.633 4.264 1.235 1.064 1.522 3.71 3.53 2.814 1.272-.567 1.593-3.475 1.963-4.618"></path>
        </g>
      </g>
    </svg>
  )
}