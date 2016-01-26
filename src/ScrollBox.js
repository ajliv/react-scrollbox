import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class ScrollBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollbarVisible: false
        };
    }

    componentWillMount() {
        if (!this.props.autohide) {
            this.showScrollbar();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.flashTimeout);
    }

    // componentDidMount() {}
    // componentWillReceiveProps() {}
    // componentDidUpdate() {}
    // shouldComponentUpdate() {}

    render() {
        const styles = this.calculateStyles();
        let scrollbarClassNames = ['scrollbox__scrollbar'];

        if (this.state.scrollbarVisible) {
            scrollbarClassNames.push('scrollbox__scrollbar--visible');
        }

        return (
            <div className='scrollbox'>
                <div ref='scrollbar' className={scrollbarClassNames.join(' ')} style={styles.scrollbar}>
                    <div ref='handle' className='scrollbox__handle' style={styles.handle} />
                </div>
                <div ref='scrollContain' className='scrollbox__scrollcontain'>
                    <div ref='content' className='scrollbox__content'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

    calculateStyles() {
        const {scrollbar, handle, scrollContain, content} = this.refs;
        const contentHeight = content.clientHeight;
        const scrollbarHeight = scrollbar.clientHeight;
        const scrollOffset = scrollContain.scrollTop;
        let styles = {};

        if (scrollbarHeight > contentHeight) {
            styles.scrollbar = { display: 'none' };
            styles.handle = { display: 'none' };
        } else {
            const scrollbarRatio = scrollbarHeight / contentHeight;
            const handleOffset = Math.round(scrollbarRatio * scrollOffset);
            const handleSize = Math.floor(scrollbarRatio * scrollbarSize);
            styles.scrollbar = { display: 'block' };
            styles.handle = {
                display: 'block',
                height: `${handleSize}px`,
                top: `${handleOffset}px`
            };
        }

        return styles;
    }

    flashScrollbar () {
        this.showScrollbar();
    }

    hideScrollbar () {
        clearTimeout(this.flashTimeout);
        this.setState({
            scrollbarVisible: false
        });
    }

    showScrollbar () {
        this.setState({
            scrollbarVisible: true
        });

        if (!this.props.autohide) return;

        clearTimeout(this.flashTimeout);
        this.flashTimeout = setTimeout(() => this.hideScrollbar(), 1000);
    }


}

ScrollBox.propTypes = {
    autohide: PropTypes.bool,
    direction: PropTypes.string
};

ScrollBox.defaultProps = {
    autohide: true,
    direction: 'vertical'
};
