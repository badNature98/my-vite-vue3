//默认引入所有scss
const styles: Record<string, any> = import.meta.glob("./*.scss", { eager: true });
