declare const global: any,
    imports: any,
    _: (arg: string) => string;

interface Rectangular {
    x: number;
    y: number;
    width: number;
    height: number;
}

declare type ProcessResult = [boolean, any, any, number];

declare interface GLib {
    PRIORITY_DEFAULT: number;
    PRIORITY_LOW: number;

    idle_add(priority: any, callback: () => boolean): number;
    spawn_command_line_sync(cmd: string): ProcessResult;
    timeout_add(ms: number, priority: any, callback: () => Boolean): number;
}

declare namespace GObject {
    interface Object {
        connect(signal: string, callback: (...args: any) => boolean | void): number;
        disconnect(id: number): void;
        ref(): this;
    }
}

declare namespace Clutter {
    enum ActorAlign {
        FILL = 0,
        START = 1,
        CENTER = 3,
        END = 3
    }

    interface Actor extends Rectangular, GObject.Object {
        visible: boolean;
        x_align: ActorAlign;
        y_align: ActorAlign;

        add_child(child: Actor): void;
        destroy(): void;
        get_child_at_index(nth: number): Clutter.Actor | null;
        get_n_children(): number;
        get_parent(): Clutter.Actor | null;
        remove_all_children(): void;
        remove_child(child: Actor): void;
        set_child_below_sibling(child: Actor, sibling: Actor | null): void;
    }

    interface Text extends Actor {
        get_text(): Readonly<string>;
        set_text(text: string | null): void;
    }
}

declare namespace Meta {
    interface Window extends Clutter.Actor {
        minimized: Readonly<boolean>;
        window_type: Readonly<any>;

        activate(time: number): void;
        change_workspace_by_index(workspace: number, append: boolean): void;
        get_compositor_private(): Clutter.Actor | null;
        get_description(): string;
        get_frame_rect(): Rectangular;
        get_maximized(): boolean;
        get_monitor(): number;
        get_stable_sequence(): number;
        get_title(): string;
        get_wm_class(): string;
        get_workspace(): Workspace | null;
        is_client_decorated(): boolean;
        is_skip_taskbar(): boolean;
        move_resize_frame(user_op: boolean, x: number, y: number, w: number, h: number): boolean;
        raise(): void;
        unmaximize(flags: any): void;
        unminimize(): void;
    }

    interface Workspace {
        activate(time: number): boolean;
        index(): number;
    }
}

declare namespace Shell {
    interface Dialog extends St.Widget {
        _dialog: St.Widget;
        contentLayout: St.Widget;
    }

    interface ModalDialog extends St.Widget {
        contentLayout: St.Widget;
        dialogLayout: Dialog;

        close(timestamp: number): void;
        open(timestamp: number, on_primary: boolean): void;

        setInitialKeyFocus(actor: Clutter.Actor): void;
    }
}

declare namespace St {
    interface Widget extends Clutter.Actor {
        hide(): void;
        set_style_class_name(name: string): void;
        show(): void;
        show_all(): void;
    }

    interface Entry extends Widget {
        clutter_text: any;

        get_clutter_text(): Clutter.Text;
        grab_key_focus(): void;
    }
}
