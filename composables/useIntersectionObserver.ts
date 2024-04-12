import { onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';

type Callback = (isIntersecting: boolean) => void;

export function useIntersectionObserver(
    elementRef: Ref<Element | null>,
    callback: Callback,
    options = { rootMargin: '300px' }
) {
    onMounted(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            callback(entry.isIntersecting);
        }, options);

        if (elementRef.value) {
            observer.observe(elementRef.value);
        }

        onUnmounted(() => {
            if (elementRef.value) {
                observer.unobserve(elementRef.value);
            }
        });
    });
}
