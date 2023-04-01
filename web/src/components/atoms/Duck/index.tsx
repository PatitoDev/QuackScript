import { useEffect, useRef } from 'react';


const MAX_DISTANCE = 15;

const Duck = () => {
    const leftContainer = useRef<SVGCircleElement | null>(null);
    const leftEye = useRef<SVGCircleElement | null>(null);
    const rightEyeContainer = useRef<SVGCircleElement | null>(null);
    const rightEye = useRef<SVGCircleElement | null>(null);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;

            if (!leftEye.current ||
                !rightEye.current ||
                !leftContainer.current ||
                !rightEyeContainer.current) return;

            // Get the center point of each eye
            const leftEyeRect = leftContainer.current.getBoundingClientRect();
            const leftEyeX = leftEyeRect.left + leftEyeRect.width / 2;
            const leftEyeY = leftEyeRect.top + leftEyeRect.height / 2;

            const rightEyeRect = rightEyeContainer.current.getBoundingClientRect();
            const rightEyeX = rightEyeRect.left + rightEyeRect.width / 2;
            const rightEyeY = rightEyeRect.top + rightEyeRect.height / 2;

            // Calculate the distance between the cursor position and each eye center
            const leftEyeDistance = Math.sqrt(Math.pow(x - leftEyeX, 2) + Math.pow(y - leftEyeY, 2));
            const rightEyeDistance = Math.sqrt(Math.pow(x - rightEyeX, 2) + Math.pow(y - rightEyeY, 2));

            // Calculate the distance to move each eye based on its distance to the cursor
            const leftEyeMoveDistance = Math.min(leftEyeDistance, MAX_DISTANCE);
            const rightEyeMoveDistance = Math.min(rightEyeDistance, MAX_DISTANCE);

            // Calculate the angle between the cursor position and each eye center
            const leftEyeAngle = Math.atan2(y - leftEyeY, x - leftEyeX) * (180 / Math.PI) + 180;
            const rightEyeAngle = Math.atan2(y - rightEyeY, x - rightEyeX) * (180 / Math.PI);

            const leftRotationTransformation = `rotate(${Math.floor(leftEyeAngle)}deg)`;
            const leftTranslationTransformation = `translate(${leftEyeMoveDistance}px)`;
            leftEye.current.style.transform = `${leftRotationTransformation} ${leftTranslationTransformation}`;

            const rightRotationTransformation = `rotate(${Math.floor(rightEyeAngle)}deg)`;
            const rightTranslationTransformation = `translate(${rightEyeMoveDistance}px)`;
            rightEye.current.style.transform = `${rightRotationTransformation} ${rightTranslationTransformation}`;
        };

        document.addEventListener('mousemove', onMouseMove);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <svg width="916" height="892" viewBox="0 0 916 892" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M634.608 239.627C635.232 288.249 626.982 310.689 602.048 358.064C602.048 358.064 704.902 272.905 721.108 267.918C737.315 262.931 749.782 265.041 770.353 272.905C790.924 280.768 806.507 301.195 825.208 329.63C843.909 358.064 868.843 418.386 883.18 475.494C897.517 532.603 917.464 596.664 910.607 641.929C903.75 687.194 883.179 741.666 858.246 775.327C833.312 808.988 779.079 855.739 739.185 865.089C699.291 874.44 469.897 887.53 469.897 887.53C469.897 887.53 316.075 893.524 248.607 874.44C181.139 855.356 133.91 835.552 98.3794 808.988C62.8483 782.423 27.3176 755.14 12.9801 719.848C-1.35736 684.557 3.63025 662.26 12.9801 631.956C22.33 601.651 36.6679 553.173 59.7316 522.869C82.7952 492.565 133.91 462.404 133.91 462.404C156.351 453.053 203.227 432.982 211.206 427.496C219.185 422.011 230.53 412.738 234.27 408.167C234.27 408.167 216.193 400.692 203.103 386.349C190.013 372.007 170.688 259.809 170.688 259.809L164.455 213.057C164.455 213.057 155.104 171.922 170.688 131.404C186.272 90.8858 218.063 66.5751 247.984 44.7577C277.905 22.9404 322.786 9.84428 362.057 6.10436C401.329 2.36445 443.717 0.494188 494.208 28.545C544.699 56.5959 573.228 88.6211 594.568 117.684C615.908 146.748 633.985 191.006 634.608 239.627Z" fill="#E4E4E4"/>
            <path d="M509.792 441.828C509.792 441.828 577.114 405.439 602.048 358.064M602.048 358.064C626.982 310.689 635.232 288.249 634.608 239.627C633.985 191.006 615.908 146.748 594.568 117.684C573.228 88.6211 544.699 56.5959 494.208 28.545C443.717 0.494188 401.329 2.36445 362.057 6.10436C322.786 9.84428 277.905 22.9404 247.984 44.7577C218.063 66.5751 186.272 90.8858 170.688 131.404C155.104 171.922 164.455 213.057 164.455 213.057L170.688 259.809C170.688 259.809 190.012 372.007 203.103 386.349C216.193 400.692 234.27 408.167 234.27 408.167M602.048 358.064C602.048 358.064 704.902 272.905 721.108 267.918C737.315 262.931 749.782 265.041 770.353 272.905C790.924 280.768 806.507 301.195 825.208 329.63C843.909 358.064 868.843 418.386 883.18 475.494C897.517 532.603 917.464 596.664 910.607 641.929C903.75 687.194 883.179 741.666 858.246 775.327C833.312 808.988 779.079 855.739 739.185 865.089C699.291 874.44 469.897 887.53 469.897 887.53C469.897 887.53 316.075 893.524 248.607 874.44C181.139 855.356 133.91 835.552 98.3794 808.988C62.8483 782.423 27.3176 755.14 12.9801 719.848C-1.35735 684.557 3.63023 662.26 12.9801 631.956C22.33 601.651 36.6679 553.173 59.7316 522.869C82.7952 492.565 133.91 462.404 133.91 462.404C156.351 453.053 203.227 432.982 211.206 427.496C219.185 422.011 230.53 412.738 234.27 408.167M234.27 408.167L267.931 423.127" stroke="black" strokeWidth="7" strokeLinecap="round"/>
            <circle ref={leftContainer} cx="63.5819" cy="63.5819" r="59.5819" transform="matrix(-1 0 0 1 437.488 96.4966)" fill="#D9D9D9" stroke="black" strokeWidth="8"/>
            <g transform="matrix(-1 0 0 1 416.777 118)">
                <circle
                    style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                    ref={leftEye} fill="black" cx="42.388" cy="42.388" r="42.388" />
            </g>
            <circle ref={rightEyeContainer} cx="63.5819" cy="63.5819" r="59.5819" transform="matrix(-1 0 0 1 245.492 91.5098)" fill="#D9D9D9" stroke="black" strokeWidth="8"/>
            <g transform="matrix(-1 0 0 1 224.777 113)">
                <circle 
                    style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                    ref={rightEye} cx="42.388" cy="42.388" r="42.388" fill="black"/>
            </g>
            <path d="M323.411 244.851C324.671 246.518 326.835 251.119 329.466 257.119C335.964 260.875 383.466 288.426 386.37 292.849C389.486 297.598 389.486 326.748 386.37 332.744C383.253 338.74 367.045 354.799 358.942 360.795C350.839 366.79 299.1 382.227 287.88 383.236C276.66 384.244 159.47 366.79 151.366 360.795C143.262 354.799 130.795 332.744 130.795 332.744C130.795 332.744 104.615 318.792 102.744 315.29C100.874 311.788 98.3813 297.598 102.744 292.849C107.107 288.101 215.571 237.757 219.935 234.878C224.298 231.999 233.648 199.109 241.752 193.736C249.855 188.364 273.543 189.613 280.4 193.736C287.257 197.86 320.294 240.726 323.411 244.851Z" fill="#FFD953"/>
            <path d="M345.928 286.428C346.72 288.191 345.932 290.263 344.169 291.055C342.406 291.847 340.335 291.06 339.542 289.297L345.928 286.428ZM323.411 244.851L326.204 242.742L326.204 242.742L323.411 244.851ZM280.4 193.736L282.204 190.737L282.204 190.737L280.4 193.736ZM241.752 193.736L243.686 196.654L243.686 196.654L241.752 193.736ZM102.744 292.849L105.322 295.217L105.322 295.217L102.744 292.849ZM102.744 315.29L105.832 313.641L105.832 313.641L102.744 315.29ZM335.164 313.889C335.938 312.117 338.002 311.309 339.773 312.083C341.544 312.857 342.353 314.92 341.579 316.691L335.164 313.889ZM151.366 360.795L149.284 363.609L149.284 363.609L151.366 360.795ZM358.942 360.795L361.024 363.608L361.024 363.608L358.942 360.795ZM386.37 332.744L383.264 331.13L383.264 331.13L386.37 332.744ZM386.37 292.849L383.443 294.77L383.443 294.77L386.37 292.849ZM339.542 289.297C335.061 279.321 330.069 267.209 326.261 258.524L332.672 255.713C336.622 264.722 341.416 276.386 345.928 286.428L339.542 289.297ZM326.261 258.524C324.952 255.538 323.775 252.939 322.778 250.894C321.739 248.762 321.016 247.487 320.618 246.961L326.204 242.742C327.066 243.882 328.055 245.742 329.071 247.827C330.129 249.999 331.35 252.7 332.672 255.713L326.261 258.524ZM320.618 246.961C319.082 244.927 310.067 233.21 300.587 221.495C295.846 215.635 291.011 209.806 286.949 205.197C284.916 202.89 283.102 200.92 281.607 199.415C280.029 197.828 279.037 197.001 278.596 196.736L282.204 190.737C283.477 191.503 285.017 192.917 286.571 194.48C288.206 196.125 290.123 198.212 292.2 200.568C296.358 205.286 301.264 211.203 306.029 217.091C315.561 228.871 324.623 240.65 326.204 242.742L320.618 246.961ZM278.596 196.736C277.431 196.035 275.167 195.275 271.971 194.683C268.87 194.109 265.204 193.749 261.473 193.675C257.738 193.6 254.025 193.812 250.817 194.343C247.53 194.887 245.103 195.714 243.686 196.654L239.818 190.819C242.452 189.073 246.025 188.041 249.673 187.437C253.4 186.82 257.556 186.595 261.613 186.676C265.674 186.757 269.723 187.148 273.245 187.8C276.672 188.434 279.94 189.376 282.204 190.737L278.596 196.736ZM243.686 196.654C243.171 196.995 242.426 197.72 241.49 198.997C240.581 200.237 239.621 201.82 238.622 203.681C236.622 207.408 234.611 211.981 232.666 216.6C230.753 221.145 228.875 225.806 227.233 229.433C226.409 231.255 225.597 232.924 224.818 234.263C224.429 234.933 224.014 235.579 223.576 236.144C223.165 236.675 222.597 237.314 221.862 237.799L218.007 231.956C217.817 232.082 217.834 232.126 218.043 231.857C218.225 231.621 218.467 231.26 218.767 230.745C219.366 229.713 220.064 228.298 220.856 226.547C222.448 223.03 224.233 218.593 226.215 213.884C228.166 209.249 230.285 204.412 232.454 200.371C233.539 198.349 234.673 196.458 235.843 194.86C236.988 193.299 238.307 191.821 239.818 190.819L243.686 196.654ZM221.862 237.799C221.39 238.11 220.513 238.571 219.538 239.069C218.477 239.61 217.067 240.31 215.365 241.144C211.958 242.812 207.335 245.039 201.909 247.639C191.038 252.848 176.965 259.544 162.854 266.318C148.752 273.086 134.671 279.904 123.849 285.322C118.435 288.033 113.862 290.381 110.52 292.191C108.845 293.098 107.513 293.851 106.552 294.437C106.069 294.731 105.713 294.962 105.467 295.136C105.167 295.346 105.19 295.361 105.322 295.217L100.167 290.482C100.572 290.041 101.07 289.67 101.437 289.411C101.858 289.115 102.358 288.795 102.911 288.458C104.02 287.783 105.47 286.965 107.187 286.035C110.629 284.172 115.28 281.785 120.715 279.063C131.594 273.617 145.719 266.778 159.825 260.007C173.921 253.241 188.054 246.515 198.884 241.326C204.308 238.727 208.908 236.511 212.286 234.857C213.976 234.029 215.347 233.348 216.357 232.833C216.863 232.575 217.265 232.365 217.565 232.203C217.898 232.024 218.013 231.952 218.007 231.956L221.862 237.799ZM105.322 295.217C104.889 295.689 104.391 296.695 104.091 298.456C103.801 300.15 103.755 302.183 103.899 304.3C104.042 306.401 104.365 308.473 104.756 310.203C105.165 312.013 105.589 313.188 105.832 313.641L99.6571 316.939C98.964 315.641 98.3758 313.729 97.9277 311.745C97.4614 309.681 97.0834 307.252 96.9148 304.775C96.7473 302.312 96.7786 299.689 97.1906 297.277C97.5912 294.933 98.4184 292.385 100.167 290.481L105.322 295.217ZM105.832 313.641C105.706 313.406 105.632 313.378 105.843 313.589C106.015 313.761 106.285 314.002 106.675 314.314C107.452 314.936 108.53 315.703 109.85 316.577C112.48 318.32 115.857 320.351 119.225 322.302C122.584 324.246 125.889 326.086 128.359 327.441C129.593 328.118 130.615 328.673 131.329 329.058C131.686 329.25 131.965 329.4 132.154 329.502C132.249 329.553 132.321 329.591 132.37 329.617C132.394 329.63 132.412 329.64 132.424 329.646C132.43 329.649 132.434 329.652 132.437 329.653C132.439 329.654 132.44 329.654 132.44 329.655C132.441 329.655 132.441 329.655 132.441 329.655C132.441 329.655 132.441 329.655 130.795 332.744C129.149 335.833 129.149 335.833 129.149 335.832C129.148 335.832 129.148 335.832 129.147 335.832C129.147 335.831 129.145 335.831 129.143 335.83C129.14 335.828 129.135 335.825 129.128 335.822C129.115 335.815 129.096 335.804 129.07 335.791C129.019 335.763 128.944 335.723 128.847 335.671C128.652 335.567 128.367 335.413 128.004 335.218C127.279 334.826 126.242 334.264 124.992 333.578C122.494 332.207 119.138 330.34 115.717 328.359C112.307 326.384 108.788 324.271 105.983 322.412C104.586 321.487 103.311 320.588 102.299 319.778C101.793 319.373 101.31 318.955 100.892 318.538C100.514 318.16 100.016 317.612 99.6571 316.939L105.832 313.641ZM130.795 329.244H302.84V336.244H130.795V329.244ZM302.84 329.244C315.996 329.244 324.101 325.152 328.869 321.296C331.279 319.347 332.889 317.414 333.881 316.004C334.377 315.299 334.717 314.726 334.924 314.351C335.027 314.163 335.097 314.025 335.136 313.945C335.156 313.906 335.168 313.88 335.172 313.87C335.175 313.865 335.175 313.864 335.174 313.867C335.173 313.869 335.172 313.872 335.17 313.875C335.169 313.877 335.169 313.879 335.168 313.881C335.167 313.882 335.166 313.884 335.166 313.885C335.165 313.887 335.164 313.889 338.371 315.29C341.579 316.691 341.578 316.694 341.577 316.696C341.576 316.697 341.575 316.699 341.575 316.701C341.573 316.704 341.572 316.708 341.57 316.712C341.566 316.719 341.562 316.728 341.558 316.738C341.549 316.758 341.538 316.782 341.525 316.81C341.499 316.866 341.465 316.939 341.422 317.027C341.336 317.203 341.214 317.44 341.055 317.729C340.735 318.309 340.262 319.1 339.607 320.031C338.297 321.893 336.256 324.324 333.271 326.738C327.25 331.609 317.589 336.244 302.84 336.244V329.244ZM130.795 332.744C133.842 331.022 133.842 331.022 133.842 331.021C133.842 331.022 133.842 331.022 133.842 331.022C133.842 331.022 133.843 331.023 133.843 331.024C133.844 331.026 133.846 331.029 133.849 331.034C133.854 331.043 133.862 331.058 133.874 331.077C133.896 331.116 133.93 331.176 133.975 331.255C134.065 331.412 134.199 331.646 134.374 331.947C134.723 332.549 135.234 333.42 135.872 334.485C137.15 336.616 138.934 339.516 140.963 342.594C142.997 345.679 145.254 348.906 147.475 351.708C149.739 354.562 151.805 356.766 153.447 357.981L149.284 363.609C146.874 361.826 144.343 359.024 141.99 356.057C139.595 353.037 137.215 349.626 135.119 346.448C133.019 343.263 131.181 340.274 129.868 338.083C129.21 336.987 128.683 336.087 128.319 335.46C128.137 335.146 127.996 334.9 127.899 334.732C127.851 334.647 127.814 334.582 127.789 334.538C127.776 334.515 127.766 334.498 127.76 334.486C127.756 334.48 127.753 334.475 127.752 334.472C127.751 334.471 127.75 334.469 127.749 334.468C127.749 334.468 127.749 334.467 127.749 334.467C127.748 334.467 127.748 334.466 130.795 332.744ZM153.447 357.981C153.417 357.959 153.526 358.039 153.886 358.203C154.22 358.355 154.676 358.536 155.267 358.742C156.449 359.156 158.029 359.623 159.986 360.136C163.891 361.16 169.101 362.314 175.225 363.541C187.46 365.991 203.166 368.695 218.998 371.184C234.826 373.673 250.743 375.942 263.39 377.525C269.717 378.317 275.204 378.934 279.444 379.321C283.82 379.721 286.542 379.842 287.567 379.75L288.193 386.721C286.413 386.882 283.019 386.677 278.807 386.292C274.458 385.895 268.886 385.267 262.521 384.471C249.787 382.877 233.796 380.597 217.911 378.099C202.03 375.602 186.218 372.881 173.85 370.404C167.672 369.167 162.309 367.982 158.211 366.907C156.165 366.371 154.386 365.85 152.955 365.35C151.64 364.89 150.256 364.328 149.284 363.609L153.447 357.981ZM287.567 379.75C290.048 379.527 295.121 378.447 301.707 376.757C308.199 375.09 315.917 372.894 323.548 370.541C331.183 368.186 338.691 365.685 344.772 363.411C347.814 362.273 350.466 361.204 352.583 360.249C354.765 359.265 356.168 358.494 356.86 357.981L361.024 363.608C359.691 364.595 357.704 365.618 355.461 366.63C353.154 367.67 350.347 368.799 347.224 369.967C340.974 372.305 333.327 374.85 325.611 377.23C317.892 379.611 310.065 381.838 303.448 383.537C296.924 385.211 291.322 386.44 288.193 386.721L287.567 379.75ZM356.86 357.981C360.702 355.139 366.635 349.769 372.038 344.308C374.724 341.593 377.233 338.9 379.246 336.541C381.317 334.115 382.684 332.247 383.264 331.13L389.475 334.358C388.497 336.239 386.67 338.626 384.571 341.085C382.416 343.611 379.782 346.432 377.014 349.231C371.508 354.797 365.285 360.455 361.024 363.608L356.86 357.981ZM383.264 331.13C383.433 330.805 383.696 330.062 383.968 328.778C384.228 327.552 384.456 326.028 384.642 324.277C385.016 320.779 385.207 316.552 385.207 312.329C385.207 308.104 385.016 303.962 384.644 300.631C384.458 298.962 384.233 297.555 383.982 296.47C383.857 295.929 383.734 295.507 383.622 295.194C383.504 294.864 383.432 294.752 383.443 294.77L389.296 290.929C390.042 292.066 390.492 293.55 390.802 294.892C391.136 296.334 391.398 298.03 391.601 299.855C392.009 303.513 392.207 307.924 392.207 312.329C392.207 316.736 392.009 321.219 391.603 325.02C391.4 326.92 391.141 328.694 390.816 330.228C390.504 331.704 390.085 333.184 389.475 334.358L383.264 331.13ZM383.443 294.77C383.542 294.919 383.5 294.816 383.018 294.394C382.605 294.032 382.023 293.569 381.267 293.005C379.757 291.881 377.703 290.47 375.244 288.853C370.335 285.625 363.965 281.675 357.452 277.727C344.433 269.836 330.958 262.024 327.715 260.149L331.218 254.089C334.473 255.97 347.998 263.811 361.08 271.741C367.617 275.703 374.073 279.705 379.09 283.004C381.595 284.651 383.779 286.148 385.448 287.391C386.281 288.012 387.024 288.597 387.629 289.127C388.165 289.597 388.835 290.227 389.296 290.929L383.443 294.77ZM327.715 260.149C327.477 260.011 327.294 259.906 327.171 259.835C327.109 259.799 327.063 259.772 327.032 259.755C327.016 259.746 327.004 259.739 326.997 259.734C326.993 259.732 326.99 259.73 326.988 259.729C326.987 259.729 326.986 259.728 326.986 259.728C326.985 259.728 326.985 259.728 326.985 259.728C326.985 259.728 326.985 259.728 326.985 259.728C326.985 259.728 326.985 259.728 326.985 259.728C326.985 259.728 326.985 259.728 326.985 259.728C326.985 259.728 326.985 259.728 328.732 256.695C330.479 253.662 330.479 253.662 330.479 253.662C330.479 253.662 330.479 253.662 330.479 253.662C330.479 253.662 330.479 253.662 330.479 253.662C330.479 253.662 330.479 253.662 330.479 253.662C330.479 253.662 330.48 253.663 330.48 253.663C330.481 253.663 330.481 253.663 330.482 253.664C330.484 253.665 330.487 253.667 330.492 253.669C330.5 253.674 330.512 253.681 330.528 253.69C330.559 253.709 330.607 253.736 330.669 253.772C330.794 253.844 330.978 253.95 331.218 254.089L327.715 260.149Z" fill="black"/>
            <path d="M301.115 247.73C302.985 242.743 287.4 225.913 283.037 227.783C278.673 229.653 279.296 245.237 283.037 248.978C286.777 252.718 299.244 252.718 301.115 247.73Z" fill="black"/>
            <path d="M393.222 263.314C393.222 263.314 409.43 273.288 411.923 280.144C414.416 287.001 411.923 308.195 411.923 308.195" stroke="black" strokeWidth="7" strokeLinecap="round"/>
            <path d="M422.52 260.197C422.52 260.197 433.117 266.431 436.858 272.664C440.598 278.898 440.598 291.365 440.598 291.365" stroke="black" strokeWidth="7" strokeLinecap="round"/>
        </svg>
    );

};

export default Duck;